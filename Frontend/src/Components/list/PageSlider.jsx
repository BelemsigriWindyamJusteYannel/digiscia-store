const PageSlider = ({ totalPost,postPerPage,setCurrentPage }) => {
    let page = []
    for( let i = 1; i <= Math.ceil(totalPost/postPerPage);i++){
        page.push(i);
    }


    return(
        <div className="flex gap-1">
            {
                page.map((element, index)=>(
                    <div 
                        key={index} 
                        className='w-7 h-7 bg-[#fff] rounded-xl text-gray-500 flex justify-center items-center border border-gray-300 cursor-pointer'
                        onClick={()=>setCurrentPage(prev=>element)}    
                    >
                        <p>{element}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default PageSlider;