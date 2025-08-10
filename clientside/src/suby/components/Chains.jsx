import React,{useState,useEffect} from 'react'
import { API_URL } from '../api'
import { FaCircleArrowRight } from "react-icons/fa6";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { MagnifyingGlass } from 'react-loader-spinner'

const Chains = () => {
    const [vendorData,setVendorData]=useState([]);
    const [scrollPos,setScrollPos]=useState(0);
    const [loading,setLoading]=useState(true)

    const vendorFirmHandler=async()=>{
        try {
            const response=await fetch(`${API_URL}/vendor/all-vendors`)
            const newData=await response.json()
            setVendorData(newData);
            console.log("This is api data",newData)
            setLoading(false)
        } catch (error) {
            alert("Failed to fetch Data")
            console.error('failed to fetch data')
            setLoading(true)
        }
    }
    useEffect(()=>{
        vendorFirmHandler()
    },[])

    const handleScroll=(direction)=>{
        const gallery=document.getElementById('chainGallery');
        const scrollAmount=300;
        if(direction==='left'){
            gallery.scrollTo({
                left:gallery.scrollLeft -scrollAmount,
                behavior:'smooth'
            })
        }
        else if(direction==='right'){
            gallery.scrollTo({
                left:gallery.scrollLeft + scrollAmount,
                behavior:'smooth'
            })}
    }


  return (
    <div className='mediaChainSection'>
    <div className="loaderSection">
    {loading && <><div className="loader">
        Foodie is Coming 🥣
    </div>
    <MagnifyingGlass
    visible={true}
    height="80"
    width="80"
    ariaLabel="magnifying-glass-loading"
    wrapperStyle={{}}
    wrapperClass="magnifying-glass-wrapper"
    glassColor="#c0efff"
    color="#e15b64"
    /></>
  
  
    }
    </div>
    <div className="btnSection">
        <button onClick={()=>handleScroll('left')}><FaCircleArrowLeft className='btnIcons'/></button>
        <button onClick={()=>handleScroll('right')}><FaCircleArrowRight className='btnIcons'/></button>
    </div>
    <h3>Top restaurant chains in Hyderabad</h3>
    <section className="chainSection" id='chainGallery' onScroll={(e)=>{setScrollPos(e.target.scrollLeft)}}> 
        {vendorData.vendors && vendorData.vendors.map((vendor)=>{
            return (
                <div className="vendorBox">
                {vendor.firm.map((item)=>{
                    return(
                        <>
                        <div>
                            {item.firmName}
                        </div>
                        <div className="firmImage">
                            <img src={`${API_URL}/uploads/${item.image}`} />
                        </div>
                        </>
                    )
                })}
            </div>)
        })}
    </section>
    </div>

  )
}

export default Chains
