const Faq = () => {
  return (
    <div className="lg:my-5 px-2 flex flex-col lg:flex-row justify-between  gap-5">
      <div className="bg-neutral-500 lg:w-1/2 p-5 px-12 rounded-lg">
        <h3 className="text-2xl font-semibold text-white">Send Us a Message</h3>
        <p className="text-white">
          If you have any questions or would like to book a session please
          contact us.
        </p>
        <div className="flex gap-2">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-white">Name</span>
            </label>
            <input
              type="text"
              placeholder="Name"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-white">Email</span>
            </label>
            <input
              type="text"
              placeholder="Email"
              className="input input-bordered w-full"
            />
          </div>
        </div>
        <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-white">Interest of Service</span>
            </label>
            <input
              type="text"
              placeholder="Interest of Service"
              className="input input-bordered w-full"
            />
          </div>
        <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-white">Message</span>
            </label>
            <textarea className="w-full border-2" name="" id="" cols="10" rows="5"></textarea>
          </div>
           
          <div className="text-center mt-5 font-bold text-white">
           <button className="btn btn-primary btn-outline">
           <input type="submit" value="Submit" />
           </button>
          </div>
         
      
      </div>
        
         <div>
              <div className="lg:my-12 pl-12">
              <h2 className="text-3xl font-bold text-gray-400">Most Popular Questions</h2>
               <p>Most popular question comes from <br /> our customer.  We try to Provide  Answer some of them.</p>
              </div>
              <div className="join join-vertical w-full">
  <div className="collapse collapse-arrow join-item border border-base-300">
    <input type="radio" name="my-accordion-4" defaultChecked /> 
    <div className="collapse-title text-xl font-medium">
      What is the best service in your company?
    </div>
    <div className="collapse-content"> 
      <p>Sit tristique montes adipiscing ipsum sociosqu inceptos fusce tempus. Cubilia consectetuer tortor quam dictum integer arcu lectus feugiat sagittis. Litora id enim habitant aptent molestie erat.</p>
    </div>
  </div>
  <div className="collapse collapse-arrow join-item border border-base-300">
    <input type="radio" name="my-accordion-4" /> 
    <div className="collapse-title text-xl font-medium">
       What is the time table of Your company to provide services?
    </div>
    <div className="collapse-content"> 
    <p>Sit tristique montes adipiscing ipsum sociosqu inceptos fusce tempus. Cubilia consectetuer tortor quam dictum integer arcu lectus feugiat sagittis. Litora id enim habitant aptent molestie erat.</p>
    </div>
  </div>
  <div className="collapse collapse-arrow join-item border border-base-300">
    <input type="radio" name="my-accordion-4" /> 
    <div className="collapse-title text-xl font-medium">
      How You Serve to Your Customers?
    </div>
    <div className="collapse-content"> 
    <p>Sit tristique montes adipiscing ipsum sociosqu inceptos fusce tempus. Cubilia consectetuer tortor quam dictum integer arcu lectus feugiat sagittis. Litora id enim habitant aptent molestie erat.</p>
    </div>
  </div>
</div>
         </div>

    </div>
  );
};

export default Faq;
