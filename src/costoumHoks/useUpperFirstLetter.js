const useUpperFirstLetter=(text)=>{
    const newText=text.split("")?.slice(1)?.join("")
    const firstLetter=text?.charAt(0)?.toUpperCase()
    
    return firstLetter+newText
}

export default useUpperFirstLetter