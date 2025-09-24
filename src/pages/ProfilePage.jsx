import React, { useState } from 'react'
import Header from '../components/Layout/Header'
import styles from '../styles/styles'
import ProfileContent from '../components/Profile/ProfileContent'
import ProfileSidebar from '../components/Profile/ProfileSidebar'
function ProfilePage() {
    const [active,setActive] = useState(1);
  return (
    <div>
        <Header />
        <div className={`${styles.section} flex  py-10`}>
            <div className='w-[335px] '>
                <ProfileSidebar active={active} setActive={setActive}/>
            </div>
            <ProfileContent active={active} setActive={setActive}/>
        </div>
    </div>
  )
}

export default ProfilePage;