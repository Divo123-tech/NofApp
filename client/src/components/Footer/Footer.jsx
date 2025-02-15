import TrackerImg from "../../assets/activity.png"
import CharityImg from "../../assets/hand.png"
import PartnerImg from "../../assets/partner.png"
import {Link} from "react-router-dom"
const Footer = () => {
    return(
    <div className="w-full bg-[#2183d2] flex justify-center py-4 gap-20 h-[12vh] mt-auto">
        <Link to="/tracker" className="flex flex-col items-center gap-1 cursor-pointer">
            <img src={TrackerImg} className="w-8 h-8"></img>
            <h1 className="text-[#d2f8bd] text-xs">Tracker</h1>
        </Link>
        <Link to="/charities" className="flex flex-col items-center cursor-pointer">
            <img src={CharityImg} className="w-8 h-8"></img>
            <h1 className="text-[#d2f8bd] text-xs">Charity</h1>
        </Link>
        <Link to="/acc-partner" className="flex flex-col items-center cursor-pointer">
            <img src={PartnerImg} className="w-8 h-8"></img>
            <h1 className="text-[#d2f8bd] text-xs">Partner</h1>
        </Link>
    </div>)
}

export default Footer