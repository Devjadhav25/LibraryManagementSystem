import React from "react";
import { AccessTime } from "@mui/icons-material";
import GetStatusChip from "./GetStatusChip";
import { Chip } from "@mui/material";
import { Button } from "@mui/material";

const CurrentLoanCard = ({loan}) => {
  return (
    <div className="flex items-center justify-between p-6 border border-gray-200 rounded-2xl ">
      {/* Left Section: Book Image & Details */}
      <div className="flex items-center space-x-4 flex-1">
        <div>
          <img
          src={loan.bookCoverImage}
          alt={loan.bookTitle}
          className="w-16 h-24  rounded-lg "
        />
        </div>
        <div className="flex-1">

          <h4 className="text-lg font-bold text-gray-900 mb-1">
            {loan.bookTitle}
          </h4>
          <p className=" text-gray-600 mmb-2">by {loan.bookAuthor}</p>

          {/* Right Section: Additional Info or Actions */}
          <div className="flex items-center space-x-4 text-sm">

            <AccessTime  sx={{  fontSize: 16}} />
            <span className="text-gray-600">
              Due: {new Date(loan.dueDate).toLocaleDateString()}
            </span>
          </div>

            <GetStatusChip status={loan.status} />
            <Chip size="small" variant="outlined" label={`Renewals left: ${loan.remainingDays>0 ? loan.remainingDays : loan.overdueDays}days ${loan.remainingDays>=0? "remaning ": "overdue"}`} />

        </div>
        <div>
          <Button variant="contained" color="primary" size="small">
            view
          </Button>
        </div>
      </div>
    </div>
  );
};
         

export default CurrentLoanCard;
