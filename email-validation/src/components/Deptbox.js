import React from 'react'
import './main.css'

export default function Deptbox() {
  return (
    <div className='branch-container'>
        <p>Browse using deparments</p>
        <ul>
            <li><button>Computer Science</button></li>
            <li><button>Electrical Engineering</button></li>
            <li><button>Civil Engineering</button></li>
            <li><button>Chemical Engineering</button></li>
            <li><button>Engineering Physics</button></li>
            <li><button>Mathematics and Computing</button></li>
        </ul>
    </div>
  )
}
