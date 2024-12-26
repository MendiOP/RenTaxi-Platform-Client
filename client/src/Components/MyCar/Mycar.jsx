const Mycar = () => {
  return (
    <div className=" max-w-7xl mx-auto ">
      <div className="overflow-x-auto">
        <table className="table text-center">
          {/* head */}
          <thead>
            <tr>
              <th>Car Model</th>
              <th>Daily Rental Price</th>
              <th>Booking Count</th>
              <th>Availability</th>
              <th>Added Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <td>
                <div className="flex items-center gap-7">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src="https://th.bing.com/th/id/OIP.XQ6CyncXgEdljRssh_LAIwHaEK?w=323&h=182&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">Ferrari</div>
                  </div>
                </div>
              </td>
              <td>
                $<span>200</span>
              </td>
              <td>0</td>
              <td>
                <span className="badge badge-success">Available</span>
              </td>
              <td>
                <time>2021-09-01</time>
              </td>
              <th>
                <div className="gap-2 flex">
                  <button className="btn btn-error btn-xs">Delete</button>
                  <button className="btn btn-info btn-xs">Edit</button>
                </div>
              </th>
            </tr>
            {/* row 2 */}
            <tr>
              <td>
                <div className="flex items-center gap-7">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src="https://th.bing.com/th/id/OIP.XQ6CyncXgEdljRssh_LAIwHaEK?w=323&h=182&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">Ferrari</div>
                  </div>
                </div>
              </td>
              <td>
                $<span>200</span>
              </td>
              <td>0</td>
              <td>
                <span className="badge badge-success">Available</span>
              </td>
              <td>
                <time>2021-09-01</time>
              </td>
              <th>
                <div className="gap-2 flex">
                  <button className="btn btn-error btn-xs">Delete</button>
                  <button className="btn btn-info btn-xs">Edit</button>
                </div>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Mycar;
