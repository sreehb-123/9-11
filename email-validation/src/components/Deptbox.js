import React from 'react'
import './main.css'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Deptbox() {
  const navigate = useNavigate();

  const handleDeptClick = (dept) => {
    navigate(`/department/${dept}`)
  };

  return (
    <div className='branch-container'>
        <p>Browse using deparments</p>
        <ul>
            <li><button onClick={() => handleDeptClick('Computer Science')} className="dept-button" > <i class="fa-solid fa-computer"></i> Computer Science</button></li>
            <li><button onClick={() => handleDeptClick('Electrical Engineering')} className="dept-button"><i class="fa-solid fa-plug"></i> Electrical Engineering</button></li>
            <li><button onClick={() => handleDeptClick('Mechanical Engineering')} className="dept-button"><i class="fa-solid fa-gears"></i> Mechanical Engineering</button></li>
            <li><button onClick={() => handleDeptClick('Civil Engineering')} className="dept-button"><i class="fa-solid fa-helmet-safety"></i> Civil Engineering</button></li>
            <li><button onClick={() => handleDeptClick('Chemical Engineering')} className="dept-button"><i class="fa-solid fa-flask"></i> Chemical Engineering</button></li>
            <li><button onClick={() => handleDeptClick('Engineering Physics')} className="dept-button"><i class="fa-solid fa-lightbulb"></i>Engineering Physics</button></li>
        </ul>
    </div>
  )
}
