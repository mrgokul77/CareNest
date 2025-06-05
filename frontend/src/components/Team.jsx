import React from 'react';
import { assets } from '../assets/assets';

const Team = () => {
  const mainPeople = [
    { name: 'John Doe', role: 'CEO', img: assets.ceo },
    { name: 'Jane Smith', role: 'Caregiver Coordinator', img: assets.cc },
    { name: 'Alice Johnson', role: 'Medical Director', img: assets.md },
  ];

  return (
    <div className="pt-24 py-8 px-6 md:px-12 lg:px-20">
      <h2 className="text-3xl font-bold text-center text-gray-800">
        Meet Our Team
      </h2>
      <p className="text-center text-gray-600 text-md mt-2">
        The dedicated professionals behind CareNest.
      </p>

      <div className="flex flex-wrap justify-center gap-16 mt-8">
        {mainPeople.map((person, index) => (
          <div
            key={index}
            className="bg-white shadow-md hover:shadow-lg rounded-xl overflow-hidden w-64 h-auto transition-all duration-300 transform hover:scale-105 text-center"
          >
            {/* Profile Image */}
            <div className="relative flex justify-center  mt-4 ">
              <img
                src={person.img}
                className="w-40 h-40 object-cover rounded-full border-4 border-gray-200"
              />
            </div>

            {/* Info Section */}
            <div className="p-4">
              <p className="text-xl font-semibold text-gray-800">{person.name}</p>
              <p className="text-sm text-gray-500 mt-1">{person.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
