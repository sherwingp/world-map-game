const Form = () => {
  return ( 
            <form>
         <label>
             Enter Player Name:
             <input type="text" name="name" />
           </label>
           <button className="btn" type="submit" value="Submit">Enter</button>
         </form>
  );
}
 
export default Form;
