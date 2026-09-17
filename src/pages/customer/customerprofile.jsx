import { useState, useEffect } from "react";
import {getMyProfile, updateMyProfile } from "../../service/customerService";

const customerProfile = ()=>{
  const [formData , setFormData]=useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    company: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    postcode: "",
    country: ""
  });
  const[error, setError]=useState("");
  const[message,setMessage]=useState("");
  const[loading, setLoading]=useState(true);
  const[saving, setSaving]=useState(false);

  useEffect(()=>{
    const loadProfile = async ()=>{
      try{
        const result = await getMyProfile();
        setFormData((prev)=>({...prev, ...result}));
      }catch(err){
        setError(err?.result?.message?.err||"faild to load profile")
      }finally{
        setLoading(false);
      }
    }
    loadProfile();
  },[])
}