import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faChartBar, faTrash } from "@fortawesome/free-solid-svg-icons";

function Test() {
  return (
    <div className="bg-purple-800 w-1/4 p-4 rounded-lg text-white">
      <div className="flex">
        <div className="">
          <h1 className="text-2xl font-bold p-1">TestName</h1>
          <p className="">
            Quick quiz assessing basic math skills for elementary students
            elementary students.
          </p>
        </div>
        <div>
          <ul>
            <li>
              <FontAwesomeIcon icon={faEdit} />
            </li>
            <li>
              <FontAwesomeIcon icon={faChartBar} />
            </li>
            <li>
              <FontAwesomeIcon icon={faTrash} />
            </li>
          </ul>
        </div>
      </div>
      <div>
        <ul className="flex gap-4 N/UO56T789=`P[P8T QAAaszwgbm,./">
          <li>Duration: 1 hours</li>
          <li>Due Date: 10/02/24</li>
        </ul>
      </div>
    </div>
  );
}

export default Test;     
