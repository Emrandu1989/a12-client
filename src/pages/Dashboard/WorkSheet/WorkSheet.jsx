import useAxiosPublic from "../../../hooks/useAxiosPublic";


const WorkSheet = () => {
    const date = new Date();
     const axiosPublic = useAxiosPublic();
    const handleWorkSheetData = (e) => {
        e.preventDefault();
        const form = e.target;
        const choice = form.choice.value;
        const hours = form.hours.value;
        const date = form.date.value;
        const workData = { choice, hours, date };
    
        console.log(workData);
       
         
    
        fetch('http://localhost:3000/workSheet', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(workData)
        })
        .then(res => res.json())
        .then(data => {
            console.log("Data posted successfully", data);
            
        })
        .catch(error => {
            console.error(error);
       
        });
    }
    
     
    return (
        <>
             <form onSubmit={handleWorkSheetData} className="bg-green-600 mb-12 py-9 px-12 rounded-lg">
                 <div className="space-x-9">
                    <select className="p-1 rounded-lg" name="choice" id="">
                        <option value="">Choose Work</option>
                        <option value="">Sales</option>
                        <option value="">Support</option>
                        <option value="">Content</option>
                        <option value="">Paper-Work</option>
                    </select>
                    <input name="hours" className="p-1 rounded-lg" type="number" placeholder="Hours" />

                    <input  className="p-1 rounded-lg" defaultValue={date} type="date" name="date" id="" />
                    <input className="p-1 text-black btn" type="submit" value="Submit" />
                </div>    
            </form> 

            <>
            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>No.</th>
        <th>Tasks</th>
        <th>Working Hours</th>
        <th>Date</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      <tr className="bg-base-200">
        <th>1</th>
        <td>Cy Ganderton</td>
        <td>Quality Control Specialist</td>
        <td>Blue</td>
      </tr>
   
    </tbody>
  </table>
</div>
            </>  
        </>
    );
};

export default WorkSheet;