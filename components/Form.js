import { useState } from "react"
const Form = () => {
    const [name, setName] = useState('');
    const handleSubmit = (e) => {
        addname(name)
        e.preventDefault();
        console.log(name)
    }

  return ( 
        <form onSubmit={handleSubmit}>
         <label data-testid="label">
             Enter Player Name:
    
             <input data-testid="input-name" type="text" name="name" onChange={(e) => setName(e.target.value)}/>
           </label>
           <button onClick={event =>  window.location.href='/game'}className="btn" type="submit" value="Submit">Enter</button>
         <p>{ name }</p>
         </form>
  )

 }


export default Form;

