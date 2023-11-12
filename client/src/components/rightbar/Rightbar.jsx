import './rightbar.css';

import {Add} from '@mui/icons-material'

export default function Rightbar() {
  return (
    <div className='rightbar'>
      <h1 className='rightbarTitle'>Group conversations</h1>
      <div className="createGroup">
        <span className='createGroupBtn'><Add /></span>
        <p className='createGroupText'>Create new group</p>
      </div>
    </div>
  )
}