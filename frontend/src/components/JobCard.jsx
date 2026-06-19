import React from 'react';
// import { Briefcase, MapPin, ExternalLink, IndianRupee } from 'lucide-react';
import { Briefcase, MapPin, IndianRupee, Clock, ExternalLink, UserCircle2 } from "lucide-react";

const JobCard = ({ job }) => {
  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-blue-500" />
            {job.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">{job.company}</p>
        </div>

        <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full dark:bg-blue-800 dark:text-white">
          {job.jobType}
        </span>
      </div>

      {/* Info Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm text-gray-700 dark:text-gray-300">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          {job.location}
        </div>
        <div className="flex items-center gap-2">
          <IndianRupee className="w-4 h-4" />
          {job.salaryRange}
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          Posted on {new Date(job.createdAt).toLocaleDateString()}
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-700 dark:text-gray-300">
        {job.description.length > 120
          ? job.description.slice(0, 120) + "..."
          : job.description}
      </p>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <UserCircle2 className="w-4 h-4" />
          Posted by {job.postedBy.fullname}
          {job.expiresAt && (
            <span className="ml-4 text-red-500">
              Expires on {new Date(job.expiresAt).toLocaleDateString()}
            </span>
          )}
        </div>

        <a
          href={job.applyLink}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary flex items-center gap-2 w-max"
        >
          <ExternalLink className="w-4 h-4" />
          Apply Now
        </a>
      </div>
    </>
  );
};

export default JobCard;
