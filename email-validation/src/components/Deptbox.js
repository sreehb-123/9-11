import React from 'react'
import './main.css'
import { useNavigate } from 'react-router-dom'

export default function Deptbox() {
  const navigate = useNavigate();

  const handleDeptClick = (dept) => {
    navigate(`/department/${dept}`)
  };

  return (
    <div className='branch-container'>
        <p>Browse using deparments</p>
        <ul>
            <li><button onClick={() => handleDeptClick('Computer Science')} className="dept-button">Computer Science</button></li>
            <li><button onClick={() => handleDeptClick('Electrical Engineering')} className="dept-button">Electrical Engineering</button></li>
            <li><button onClick={() => handleDeptClick('Mechanical Engineering')} className="dept-button">Mechanical Engineering</button></li>
            <li><button onClick={() => handleDeptClick('Civil Engineering')} className="dept-button">Civil Engineering</button></li>
            <li><button onClick={() => handleDeptClick('Chemical Engineering')} className="dept-button">Chemical Engineering</button></li>
            <li><button onClick={() => handleDeptClick('Engineering Physics')} className="dept-button">Engineering Physics</button></li>
        </ul>
    </div>
  )
}