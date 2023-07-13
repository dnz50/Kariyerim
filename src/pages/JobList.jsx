import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setJobs } from '../redux/jobSlice'
import axios from 'axios'
import { FaMapMarkedAlt, FaNetworkWired, FaRegCalendarAlt, FaCheckSquare } from "react-icons/fa";
import Filter from '../components/Filter';


const JobList = () => {
    const state = useSelector((store) => store.jobReducer)
    const dispatch = useDispatch();
    useEffect(() => {
        axios.get("http://localhost:3060/jobs")
            .then((res) => dispatch(setJobs(res.data)))
    }, [])
    return (
        <div >
            <Filter />
            <div className='list'>
                <h4 className='find-text'>Toplam {state.jobs.length} iş arasından
                {" "}{state.filteredJobs.length} tanesi görüntüleniyor</h4>

                <section className='list-section'>
                    {!state.initialized ? (
                        <p>Loading...</p>
                    ) : (state.filteredJobs.map((job, index) => (
                        <div key={index} className='job-card'>
                            <div className="head">
                                <div className="letter">
                                    <p>{job.company[0]}</p>
                                </div>
                                <div className="info">
                                    <p>{job.position}</p>
                                    <p>{job.company}</p>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="field">
                                    <div className='icon'><FaMapMarkedAlt /> </div>
                                    <p>{job.location}</p>
                                </div>
                                <div className="field">
                                    <div className='icon'><FaRegCalendarAlt /> </div>
                                    <p>{job.date}</p>
                                </div>
                                <div className="field">
                                    <div className='icon'><FaNetworkWired /> </div>
                                    <p>{job.type}</p>
                                </div>
                                <div className="field">
                                    <div className='icon'><FaCheckSquare /> </div>
                                    <button className='card-btn'>Başvur</button>
                                </div>
                            </div>
                        </div>
                    )))}
                </section>

            </div>
        </div>
    )
}

export default JobList