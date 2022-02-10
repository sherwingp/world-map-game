
import { useState } from "react"
const Form = () => {
    const [name, setName] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(name)
        const data = {name}
        console.log(data)
        const res = await fetch('/api/name', {
          body: JSON.stringify({
            name: (e.target.name.value)
          }),
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST',
        })
        
        const result = await res.json()
        alert(`Is this your Player name: ${result.data}`)
    }

  return ( 
        <form onSubmit={handleSubmit}>
         <label data-testid="label">
             Enter Player Name:
    
             <input data-testid="input-name" type="text" name="name" onChange={(e) => setName(e.target.value)}/>
           </label>
           <button className="btn" type="submit" value="Submit">Enter</button>
         </form>
  )

 }

export default Form;
