import MyImage from "@/components/my-components/myImage";

const SubjectBody = () => {
  return (
    <div className=" happy-card space-y-4">
      <div className=" flex flex-col  w-full space-y-4">
      <div className=" flex space-x-6 items-center">
        <MyImage src="/images/1.jpg" classname=" card " className=" size-20" />
        <div>
          <h2 className=" happy-title-head">Subject Name</h2>
          <span className=" ">DY123P</span>
        </div>
      </div>
      <div className=" flex justify-between">
        <div className=" space-y-2">
          <div className=" flex space-x-2">
            <span className=" ">Sector:</span>
            <h3 className="  font-medium">TVET </h3>
          </div>
          <div className=" flex space-x-2">
            <span className=" ">Trade:</span>
            <h3 className="  font-medium">Software Development</h3>
          </div>
          <div className=" flex space-x-2">
            <span className=" ">Subject Type:</span>
            <h3 className="  font-medium">General</h3>
          </div>
          <div className=" flex space-x-2">
            <span className=" ">Class room:</span>
            <h3 className="  font-medium">Level 5 Software development</h3>
          </div>
          <div className=" flex space-x-2">
            <span className=" ">Curriculum:</span>
            <h3 className="  font-medium">
              CTSWD5001-TVET CERTIFICATE V IN SOFTWARE DEVELOPMENT
            </h3>
          </div>
          <div className=" flex space-x-2">
            <span className=" ">Copyright:</span>
            <h3 className="  font-medium"> &copy; Rwanda TVET Board, 2024 </h3>
          </div>
          <div className=" flex space-x-2">
            <span className=" ">Issue Date:</span>
            <h3 className="  font-medium">February,2024 </h3>
          </div>
        </div>
        <div>
          <div className=" flex space-x-2">
            <span className=" ">Learning Hours:</span>
            <h3 className="  font-medium">32 houses </h3>
          </div>
        </div>
      </div>
    </div>
      <div className=" space-y-2">
        <h2 className=" happy-title-base">Purpose:</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam
          molestias enim veniam harum odit dolores est, ipsam illo, rem,
          accusantium dolor aperiam architecto aut minus nemo expedita rerum
          ducimus fugiat.
        </p>
      </div>
      <div>
        <h2 className=" happy-title-base">Components</h2>
        {[...Array(4)].map((_, i) => (
          <div key={i} className=" pl-4 space-y-2">
            <h4 className=" font-semibold">
              {i + 1}. Perform Requirements Analysis
            </h4>
            <div className=" ml-4">
              <div>
                <p>
                  {i + 1}.1. Terms of reference are properly analysed according
                  to industry quality assurance standards.
                </p>
              </div>
              <div>
                <p>
                  {i + 1}.2. Terms of reference are properly analysed according
                  to industry quality assurance standards.
                </p>
                <div className=" ml-4">
                  <p>
                    {i + 1}.2.1. Lorem, ipsum dolor sit amet consectetur
                    adipisicing elit. Nesciunt laboriosam corrupti quidem vero
                    qui consequatur
                  </p>
                  <p>
                    {i + 1}.2.2. Lorem, ipsum dolor sit amet consectetur
                    adipisicing elit. Nesciunt laboriosam corrupti quidem vero
                    qui consequatur
                  </p>
                  <p>
                    {i + 1}.2.3. Lorem, ipsum dolor sit amet consectetur
                    adipisicing elit. Nesciunt laboriosam corrupti quidem vero
                    qui consequatur
                  </p>
                </div>
              </div>
              <p>
                {i + 1}.3. Terms of reference are properly analysed according to
                industry quality assurance standards.
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* <table className=" border card  p-2">
        <th className=" flex justify-between card-title">
          <tr className=" justify-between w-full flex">
            <td className=" w-1/2">Knowledge</td>
            <td className=" w-1/2">Skills</td>
          </tr>
        </th>
        <tbody className=" flex justify-between">
            {[...Array(2)].map((_, i) => (
          <tr key={i}>
              <td >
                Bruno
              </td>
          </tr>
            ))}
        </tbody>
      </table> */}
    </div>
  );
};

export default SubjectBody;
