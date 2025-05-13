import './BackBlur.css'
const BlackBlur = () =>{
    return<>
        <div className="absolute top-15 -z-10 right-20 bg-amber-500 w-50 h-50 rounded-full blur-xl"></div>
        <div className="absolute top-30 -z-10 right-150 bg-amber-500 w-80 h-50 rounded-full blur-lg"></div>
        <div className="absolute top-200 -z-10 right-200 bg-amber-500 w-80 h-150 rounded-full blur-lg"></div>
        <div className="absolute bottom-50 -z-10 left-100 bg-amber-500 w-20 h-5 rounded-full blur-lg"></div>
        <div className="absolute top-300 -z-10 right-0 bg-amber-500 w-220 h-150 rounded-full blur-lg"></div>
        <div className="absolute bottom-15 -z-10 right-50 bg-amber-500 w-120 h-60 rounded-full blur-lg"></div>
    </>
}

export default BlackBlur;