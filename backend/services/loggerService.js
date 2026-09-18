const pino = require("pino");
const pinoHttp = require("pino-http");
const { randomUUID } = require("crypto");
const mongoose = require("mongoose");


// ============================================================
// MONGODB STREAM
// ============================================================

const mongoStream = {

    write: async (log) => {

        try {

            // Pino sends JSON as a string
            const data = JSON.parse(log);


            // ====================================================
            // Get log date
            // ====================================================

            const logDate = data.time
                ? new Date(data.time)
                : new Date();


            // ====================================================
            // Daily collection
            //
            // Example:
            // log_2026_08_20
            // ====================================================

            const collectionName =
                `log_${logDate.getFullYear()}_` +
                `${String(logDate.getMonth() + 1).padStart(2, "0")}_` +
                `${String(logDate.getDate()).padStart(2, "0")}`;


            // ====================================================
            // Get MongoDB collection
            // ====================================================

            const collection =
                mongoose.connection.collection(collectionName);


            // ====================================================
            // Insert log
            // ====================================================

            await collection.insertOne({

                type: data.type || "application",

                level: data.level,

                message: data.msg || "",

                time: logDate,

                requestId: data.requestId || null,

                method: data.method || null,

                url: data.url || null,

                ip: data.ip || null,

                statusCode: data.statusCode ?? null,

                processTime: data.processTime ?? null

            });

        } catch (error) {

            console.error(
                "MongoDB Logger Error:",
                error.message
            );

        }

    }

};


// ============================================================
// PINO LOGGER
// ============================================================

const logger = pino(

    {
        level: "info",

        // Don't automatically add pid / hostname
        base: null,

        timestamp: pino.stdTimeFunctions.isoTime
    },


    // ========================================================
    // MULTIPLE OUTPUTS
    // ========================================================

    pino.multistream([


        // ====================================================
        // TERMINAL
        // ====================================================

        {
            level: "info",

            stream: pino.transport({

                target: "pino-pretty",

                options: {

                    colorize: true,

                    translateTime: "SYS:standard",

                    singleLine: true

                }

            })

        },


        // ====================================================
        // MONGODB
        // ====================================================

        {
            level: "info",

            stream: mongoStream

        }

    ])

);


// ============================================================
// PINO HTTP
// ============================================================

const pinoHttpMiddleware = pinoHttp({

    logger,

    // Generate unique request ID
    genReqId: () => randomUUID(),

    // We create request logs ourselves
    autoLogging: false

});


// ============================================================
// REQUEST LOGGER
// ============================================================

const requestLogger = (req, res, next) => {

    pinoHttpMiddleware(req, res, () => {


        // ====================================================
        // REQUEST ID
        // ====================================================

        req.log = req.log.child({

            requestId: req.id

        });


        // ====================================================
        // START TIMER
        // ====================================================

        const startTime = process.hrtime.bigint();


        // ====================================================
        // INCOMING REQUEST
        // ====================================================

        req.log.info(

            {

                type: "incoming",

                method: req.method,

                url: req.originalUrl,

                ip: req.ip

            },

            `Incoming ${req.method} ${req.originalUrl}`

        );


        // ====================================================
        // RESPONSE FINISHED
        // ====================================================

        res.on("finish", () => {

            const endTime = process.hrtime.bigint();


            // Convert nanoseconds to milliseconds
            const processTime =
                Number(endTime - startTime) / 1_000_000;


            req.log.info(

                {

                    type: "completed",

                    method: req.method,

                    url: req.originalUrl,

                    ip: req.ip,

                    statusCode: res.statusCode,

                    processTime: Number(
                        processTime.toFixed(2)
                    )

                },

                `Completed ${req.method} ${req.originalUrl}`

            );

        });


        next();

    });

};


// ============================================================
// EXPORT
// ============================================================

module.exports = {

    logger,

    requestLogger

};