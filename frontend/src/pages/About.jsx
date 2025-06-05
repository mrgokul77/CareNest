import React from "react";
import { assets } from "../assets/assets";

const About = () => {
    return (
        <div>
            <div className="text-center text-2xl pt-10 text-gray-500">
                <p>
                    ABOUT <span className="text-gra7-700 font-medium">US</span>
                </p>
            </div>

            <div className="my-10 flex flex-col md:flex-row gap-12">
                <img
                    className="w-full md:max-w-[400px] md:max-h-[250px] object-cover"
                    src={assets.about_image}
                    alt=""
                />
                <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
                    <p>
                        "Welcome to CareNest, your trusted partner in providing compassionate and reliable caregivers for elderly loved ones. At CareNest, we understand the importance of finding the right support to ensure comfort, dignity, and well-being for aging family members.
                    </p>
                    <p>
                        CareNest is dedicated to simplifying the process of connecting families with experienced caregivers. Whether you need assistance with daily activities, medical support, or companionship, we are here to provide a seamless experience tailored to your needs.


                    </p>
                    <b className="text-gray-800">Our Vision</b>
                    <p>
                        Our vision at CareNest is to create a world where every elderly individual receives the care and respect they deserve. We strive to bridge the gap between families and professional caregivers, ensuring a safe, nurturing, and personalized care experience."
                    </p>
                </div>
            </div>

            <div className="text-xl my-4">
                <p>
                    WHY <span className="text-gray-700 font-semibold">CHOOSE US</span>
                </p>
            </div>

            <div className="flex flex-col md:flex-row mb-20">
                <div className="border px-10 md:px-16 py-8 sm:py-16flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
                    <b>Compassionate Care:</b>
                    <p>Our caregivers are dedicated to providing warmth, empathy, and respectful assistance tailored to each individual's needs.</p>
                </div>

                <div className="border px-10 md:px-16 py-8 sm:py-16flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
                    <b>Reliability & Trust:</b>
                    <p>We carefully vet and select experienced caregivers to ensure the highest standards of service and security for your loved ones.</p>
                </div>

                <div className="border px-10 md:px-16 py-8 sm:py-16flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
                    <b>Personalized Support:</b>
                    <p>From daily activities to specialized care, we match caregivers based on your family's unique requirements for a truly customized experience.</p>
                </div>

            </div>


        </div>
    );
};

export default About;
