import React from 'react'
import Zoom from '../components/Zoom'
import Sidebar from '../components/SidebarAdmin'

export default function ZoomPage() {
    return (
        <div>
            {Sidebar}
            <Zoom />
        </div>
    )
}