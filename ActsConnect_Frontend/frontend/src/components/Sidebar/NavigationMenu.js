import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import MessageIcon from '@mui/icons-material/Message';
import ListAltIcon from '@mui/icons-material/ListAlt';
import GroupIcon from '@mui/icons-material/Group';
import VerifiedIcon from '@mui/icons-material/Verified';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PendingIcon from '@mui/icons-material/Pending';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import WorkIcon from '@mui/icons-material/Work'; 
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HandshakeIcon from '@mui/icons-material/Handshake';


export const navigationMenu=[
    {
        title:"Home",
        icon:<HomeIcon/>,
        path:"/"
    },
    {
        title: "Job",
        icon: <WorkIcon />, 
        path:"/add-job"
    },
    {
        title:"Add Job" ,
        icon:<ControlPointIcon/>,
        path:"/view-job"
        
    },
    {
        title:"Messages" ,
        icon:<MessageIcon/>,
        path:"/messages"
    },
    {
        title:"Find People" ,
        icon:<HandshakeIcon/>,
        path:"/find-people"
    },
    
    {
        title:"Profile" ,
        icon:<AccountCircleIcon/>,
        path:"/profile"
        
    },
    {
        title:"Accomodation" ,
        icon:<LocationOnIcon/>,
        path:"/accommodation"
        
    },
    {
        title:"Meet The Team" ,
        icon:<GroupIcon/>,
        path:"/meet-the-team"
        
    }
   
]