import React, { useState } from 'react'
import { statusOptions,typeOptions } from '../constants'
import axios from 'axios'
import { addNewJob } from '../redux/jobSlice'
import { useDispatch } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'

const AddJob = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formState, setFormState] = useState({
    id: new Date().getTime(),
    position: "",
    company: "",
    location: "",
    status: "mülakat",
    type: "tam-zamanlı",
    date: new Date().toLocaleDateString()
  })
  const handleAdd=(e)=>{
    e.preventDefault();

    if (!formState.position || !formState.location || !formState.company){
      toast.warn("Lütfen Bütün Alanları Doldurun")
      return
    }

    axios.post("http://localhost:3060/jobs",formState) //apiye gönderdik
    .then(()=>{dispatch(addNewJob(formState)); // addNewJob reducerına formStati gönderdik
      //başarılıysa buranın altına yazıyoruz
    navigate("/");  // anasayfaya yönlendirdik

    toast.success("Yeni iş eklendi")// toast oluşturduk

    }) //stora gönderdik

    .catch((err)=>console.log(err)) // veride hata olursa yakaladık
  }
  return (
    <section className='addjob'>
      <h2>Yeni İş Ekle</h2>
      <form className='form' onSubmit={handleAdd}>


        <div className="pos-input">
          <label>Pozisyon</label>
          <input type="text" onChange={(e) => setFormState({
            ...formState,
            position: e.target.value,
          })} />
        </div>
        <div className="comp-input">
          <label >Şirket</label>
          <input type="text" onChange={(e) => setFormState({
            ...formState, company: e.target.value
          })} />
        </div>
        <div className="loc-input">
          <label >Yer</label>
          <input type="text" onChange={(e)=>setFormState({
            ...formState,location:e.target.value
          })} />
        </div>
        <div className="stat-input">
          <label>Deneyim</label>
          <select onChange={(e)=>setFormState({
            ...formState,status:e.target.value})}>
          {statusOptions.map((opt,index)=>(
            <option key={index} value={opt.label}>{opt.label} </option>
          ))}
          </select>
          
        </div>
        <div className="type-input">
          <label>iş Türü</label>
          <select onChange={(e)=>setFormState({
            ...formState,type:e.target.value})}>
          {typeOptions.map((item,index)=>(
            <option key={index} value={item.label}>{item.label} </option>
          ))}
          </select>
          
        </div>
        <div className='btn-area'>
          <button className='add-btn' >Ekle</button>
        </div>
        

        
      </form>
    </section>
  )
}

export default AddJob