"use client"

import TeamDetails from "@/features/teams/components/ManageTeamDetails"



const ManageTeamDetailsPage = () => {
 
  return (
    <div className="min-h-screen ">
        <h1 className="text-xl text-start text-orange-300 mt-10">Manage Teams ManageTeamDetailsPage</h1>
        {/* <div className="flex justify-center items-center rounded-lg border p-8 mt-10" style={{ borderColor: "#E2E8F0", background: "#fff" }}>
            <h4 className="text-[24px] font-medium">Coming soon..</h4>
        </div> */}
        <TeamDetails   />
    </div>
  )
}

export default ManageTeamDetailsPage