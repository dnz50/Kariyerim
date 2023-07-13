import React, { useRef } from 'react'
import { sortOptions, statusOptions, typeOptions } from '../constants'
import { clearState, filterByStatus,filterByType, handleSearch, sortState } from '../redux/jobSlice'
import { useDispatch } from 'react-redux'

const Filter = () => {
    const dispatch = useDispatch()
    //input her değiştiğinde çalışır
    const handleInput=(e)=>{
        dispatch(handleSearch(e.target.value))
    }

    const handleStatus = (e)=>{
        dispatch(filterByStatus(e.target.value))

    }
    const handleType =(e)=>{
        dispatch(filterByType(e.target.value))
    }
    const handleSort=(e)=>{
        dispatch(sortState(e.target.value))
    }
    //jsx de elemanı alma
    const inputRef=useRef();
    const selectRef = useRef();
    const typeRef = useRef();
    const sortRef = useRef();

    const handleClear = (e)=>{
        e.preventDefault()
        inputRef.current.value=""//input içini temizleme
        // selectleri default değerine getirdik
        selectRef.current.value="--seçiniz--";
        typeRef.current.value="--seçiniz--";
        sortRef.current.value="--seçiniz--";
        
        dispatch(clearState())
    }
    

    return (
        <section className='filter-section'>
            <h2>İş Arama Filtreleme</h2>
            <div className="filter-form">
                <div >
                    <label className='filter-label'>İş Ara</label>
                    <input ref={inputRef} className='filter-input' type="text" 
                    onChange={handleInput}/>
                </div>
                <div>
                    <label className='filter-label'>Deneyim</label>
                    <select ref={selectRef} className='filter-select'
                     onChange={handleStatus}>
                        <option selected disabled>--seçiniz--</option>
                        {statusOptions.map((item, index) => (
                            <option key={index} value={item.label}>{item.label} </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className='filter-label'>İş şekli</label>
                    <select ref={typeRef} className='filter-select' onChange={handleType}>
                        <option selected disabled>--seçiniz--</option>
                        {typeOptions.map((type, index) => (
                            <option key={index} value={type.label}>{type.label} </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className='filter-label'>Sıralama</label>
                    <select ref={sortRef} className='filter-select' onChange={handleSort}>
                    <option selected disabled>--seçiniz--</option>
                        {sortOptions.map((sort, index) => (
                            <option key={index} value={sort}>{sort} </option>
                        ))}
                    </select>
                </div>
                <div>
                    <button className='clear-btn'
                    onClick={handleClear}>Filtreleri Temizle</button>
                </div>
                
            </div>
            
        </section>
    )
}

export default Filter