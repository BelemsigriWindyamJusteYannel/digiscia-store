import './BackBlur.css'
const BlackBlur = () =>{
    return<>
        <div className="absolute top-15 -z-10 right-20 bg-blue-500 w-50 h-50 rounded-full blur-xl"></div>
        <div className="absolute top-60 -z-10 right-250 bg-blue-500 w-80 h-50 rounded-full blur-lg"></div>
        <div className="absolute top-200 -z-10 right-200 bg-blue-500 w-80 h-150 rounded-full blur-lg"></div>
        <div className="absolute bottom-10 -z-10 left-43 bg-blue-500 w-20 h-5 rounded-full blur-lg"></div>
        <div className="absolute bottom-200 -z-10 right-100 bg-blue-400 w-220 h-150 rounded-full blur-lg"></div>
        <div className="absolute bottom-15 -z-10 right-50 bg-blue-400 w-120 h-60 rounded-full blur-lg"></div>
    </>
}

export default BlackBlur;