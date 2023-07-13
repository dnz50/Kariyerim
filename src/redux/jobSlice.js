import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    jobs: [],
    filteredJobs: [],
    filteredType: [],
    initialized: false,
}
const JobSlice = createSlice(
    {
        name: "jobSlice",
        initialState,
        reducers: {
            setJobs: (state, action) => {
                state.jobs = action.payload; //orjinale apiden gelen veri
                state.filteredJobs = action.payload;//kopya diziye apiden gelen veri
                state.initialized = true;
            },
            addNewJob: (state, action) => {
                state.jobs = [...state.jobs, action.payload]
            },
            //duruma göre filtreleme
            filterByStatus: (state, action) => {
                //action.payload ile gelen elemanlarla yeni bir dizi oluşturduk 
                const filteredJobs = state.jobs.filter((job) => job.status === action.payload);
                //oluşturduğumuz kopya diziyi güncelleme
                state.filteredJobs = filteredJobs;
            },
            filterByType: (state, action) => {
                const filteredType = state.jobs.filter((job) => job.type === action.payload);
                state.filteredJobs = filteredType
            },
            handleSearch: (state, action) => {
                //aramadan gelen action.payloadı küçük harfe çevirdik
                const query = action.payload.toLowerCase();

                //actionla gelen arama terimiyle eşleşen yeni dizi oluştur
                const searcFilter = state.jobs.filter((job) =>
                    //karşılaştırma yaptığımızı da küçük harfe çevirdik 
                    job.position.toLowerCase().includes(query))
                //kopya dizinin yeni değerini searchFilter yapıyoruz
                state.filteredJobs = searcFilter;

            },
            clearState:(state,action)=>{
                state.filteredJobs = state.jobs
 

            },
            sortState: (state, action) => {
                switch (action.payload) {
                    case "a-z"://sort dizi sıralama metodu
                        //obje içinde sıralama
                        state.filteredJobs.sort((a, b) => {
                            if (a.position < b.position) return -1;//geriye koy
                            if (a.position > b.position) return 1;//ileriye koy
                            return 0; //eşit
                        });
                        break;
                    case "z-a":
                        state.filteredJobs.sort((a, b) => {
                            if (a.position < b.position) return 1;
                            if (a.position > b.position) return -1;
                            return 0;
                        });
                        break;
                    case "En Yeni":
                        //iki objenin date değerlerini sırala
                        state.filteredJobs.sort(
                            (a, b) => new Date(b.date) - new Date(a.date)
                        );//yeni tarih objesi oluşturduk birbirinden çıkardık.
                        break;
                    case "En Eski":
                        state.filteredJobs.sort(
                            (a, b) => new Date(a.date) - new Date(b.date)
                        );
                        break;
                }


            }
        }
    }
)

export const { setJobs, addNewJob, filterByStatus, filterByType, handleSearch, sortState,clearState } = JobSlice.actions;
export default JobSlice.reducer