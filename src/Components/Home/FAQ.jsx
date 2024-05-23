import React from "react";
import { useState } from "react";
import { SiSemanticweb } from "react-icons/si";
import { MdLeaderboard } from "react-icons/md";
import { GoTools } from "react-icons/go";
import { FaRegThumbsUp } from "react-icons/fa6";
import { MdGppGood } from "react-icons/md";

function FAQ() {
  const [activeAccordion, setActiveAccordion] = useState(0);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  function rotateIcon(iconId) {
    const iconSpan = document.getElementById(iconId);

    if (iconSpan.classList.contains("rotate-0")) {
      iconSpan.classList.remove("rotate-0");
      iconSpan.classList.add("rotate-180");
    } else {
      iconSpan.classList.remove("rotate-180");
      iconSpan.classList.add("rotate-0");
    }
  }

  return (
    <div className="font-family bg-[--main-color]">
      <div className="pt-16 pb-10">
        <div className="text-center text-4xl font-bold mx-auto lg:w-[500px]">
          You have questions and we have answers
        </div>
        <div>
          <div className="lg:px-56 md:px-16 px-4 lg:py-10 md:py-10 py-10">
            <div id="accordionFlushExample">
              {/* First Accordion Item */}
              <div className="rounded-lg shadow-lg border mb-7 bg-white border-neutral-200 dark:border-neutral-600 dark:bg-body-dark">
                <h2 className="mb-0" id="flush-headingOne">
                  <button
                    className="group relative flex w-full items-center rounded-lg border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition overflow-anchor:none hover:z-[2] focus:z-[3] focus:outline-none dark:bg-body-dark dark:text-white"
                    type="button"
                    onClick={() => {
                      toggleAccordion(0);
                      rotateIcon("iconSpanOne");
                    }}
                    aria-expanded={activeAccordion === 0 ? "true" : "false"}
                    aria-controls="flush-collapseOne"
                  >
                    <div className="flex items-center">
                      <div>
                        <SiSemanticweb className="bg-[--second-color] text-[--three-color] text-7xl p-5 rounded-lg md:mx-0 lg:mx-0 mx-auto" />
                      </div>
                      <div className="text-xl font-semibold ps-5 pe-7">
                        Is Lead Hunter for me?
                      </div>
                    </div>
                    <span
                      className="-me-1 ms-auto h-5 w-5 shrink-0 rotate-180 transition-transform duration-200 ease-in-out group-data-[twe-collapse-collapsed]:me-0 group-data-[twe-collapse-collapsed]:rotate-180 motion-reduce:transition-none"
                      id="iconSpanOne"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        id="arrowIconOne"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </span>
                  </button>
                </h2>
                <div
                  id="flush-collapseOne"
                  className={`px-5 pt-0 py-4 ${
                    activeAccordion === 0 ? "!visible" : "hidden"
                  } border-0`}
                  aria-labelledby="flush-headingOne"
                >
                  <div className="text-sm">
                    Lead Hunter is perfect for web design agencies and freelancers
                    that are looking to quickly grow their businesses and
                    clientele.
                  </div>
                </div>
              </div>

              {/* Second Accordion Item */}
              <div className="rounded-lg border mb-7 shadow-lg bg-white border-neutral-200 dark:border-neutral-600 dark:bg-body-dark">
                <h2 className="mb-0" id="flush-headingTwo">
                  <button
                    className="group relative flex w-full items-center rounded-lg border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition overflow-anchor:none hover:z-[2] focus:z-[3] focus:outline-none dark:bg-body-dark dark:text-white"
                    type="button"
                    onClick={() => {
                      toggleAccordion(1);
                      rotateIcon("iconSpanTwo");
                    }}
                    aria-expanded={activeAccordion === 1 ? "true" : "false"}
                    aria-controls="flush-collapseTwo"
                  >
                    <div className="flex items-center">
                      <div>
                        <MdLeaderboard className="bg-[--second-color] text-[--three-color] text-7xl p-5 rounded-lg md:mx-0 lg:mx-0 mx-auto" />
                      </div>
                      <div className="text-xl font-semibold ps-5">
                        Where are the leads from?
                      </div>
                    </div>
                    <span
                      className="-me-1 ms-auto h-5 w-5 shrink-0 rotate-0 transition-transform duration-200 ease-in-out group-data-[twe-collapse-collapsed]:me-0 group-data-[twe-collapse-collapsed]:rotate-180 motion-reduce:transition-none"
                      id="iconSpanTwo"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        id="arrowIconTwo"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </span>
                  </button>
                </h2>
                <div
                  id="flush-collapseTwo"
                  className={`px-5 pt-0 py-4 ${
                    activeAccordion === 1 ? "!visible" : "hidden"
                  } border-0`}
                  aria-labelledby="flush-headingTwo"
                >
                  <div className="text-sm">
                    All of our leads are sourced by our team. We scour the web
                    looking for companies that have horrible websites. We then
                    vet each site through a rigorous checklist process before
                    they are given to you.
                  </div>
                </div>
              </div>

              {/* Third Accordion Item */}
              <div className="rounded-lg border mb-7 shadow-lg bg-white border-neutral-200 dark:border-neutral-600 dark:bg-body-dark">
                <h2 className="mb-0" id="flush-headingThree">
                  <button
                    className="group relative flex w-full items-center rounded-lg border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition overflow-anchor:none hover:z-[2] focus:z-[3] focus:outline-none dark:bg-body-dark dark:text-white"
                    type="button"
                    onClick={() => {
                      toggleAccordion(2);
                      rotateIcon("iconSpanThree");
                    }}
                    aria-expanded={activeAccordion === 2 ? "true" : "false"}
                    aria-controls="flush-collapseThree"
                  >
                    <div className="flex items-center">
                      <div>
                        <GoTools className="bg-[--second-color] text-[--three-color] text-7xl p-5 rounded-lg md:mx-0 lg:mx-0 mx-auto" />
                      </div>
                      <div className="text-xl font-semibold ps-5">
                        Is this another lead generation tools?
                      </div>
                    </div>
                    <span
                      className="-me-1 ms-auto h-5 w-5 shrink-0 rotate-0 transition-transform duration-200 ease-in-out group-data-[twe-collapse-collapsed]:me-0 group-data-[twe-collapse-collapsed]:rotate-180 motion-reduce:transition-none"
                      id="iconSpanThree"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        id="arrowIconThree"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </span>
                  </button>
                </h2>
                <div
                  id="flush-collapseThree"
                  className={`px-5 pt-0 py-4 ${
                    activeAccordion === 2 ? "!visible" : "hidden"
                  } border-0`}
                  aria-labelledby="flush-headingThree"
                >
                  <div className="text-sm">
                    No! We're not like other lead generation tools that utilize
                    LinkedIn search and outdated data sets. All of the leads in
                    our system came from countless hours of online research and
                    verification. You won't find these leads anywhere else.
                  </div>
                </div>
              </div>
              {/* four Accordion Item */}
              <div className="rounded-lg border mb-7 bg-white shadow-lg border-neutral-200 dark:border-neutral-600 dark:bg-body-dark">
                <h2 className="mb-0" id="flush-headingFour">
                  <button
                    className="group relative flex w-full items-center rounded-lg border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition overflow-anchor:none hover:z-[2] focus:z-[3] focus:outline-none dark:bg-body-dark dark:text-white"
                    type="button"
                    onClick={() => {
                      toggleAccordion(3);
                      rotateIcon("iconSpanFour");
                    }}
                    aria-expanded={activeAccordion === 3 ? "true" : "false"}
                    aria-controls="flush-collapseFour"
                  >
                    <div className="flex items-center">
                      <div>
                        <FaRegThumbsUp className="bg-[--second-color] text-[--three-color] text-7xl p-5 rounded-lg md:mx-0 lg:mx-0 mx-auto" />
                      </div>
                      <div className="text-xl font-semibold ps-5">
                        Does this work for a freelancer?
                      </div>
                    </div>
                    <span
                      className="-me-1 ms-auto h-5 w-5 shrink-0 rotate-0 transition-transform duration-200 ease-in-out group-data-[twe-collapse-collapsed]:me-0 group-data-[twe-collapse-collapsed]:rotate-180 motion-reduce:transition-none"
                      id="iconSpanFour"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        id="arrowIconFour"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </span>
                  </button>
                </h2>
                <div
                  id="flush-collapseFour"
                  className={`px-5 pt-0 py-4 ${
                    activeAccordion === 3 ? "!visible" : "hidden"
                  } border-0`}
                  aria-labelledby="flush-headingFour"
                >
                  <div className="text-sm">
                    Absolutely! This is a great way to turn your freelancing
                    business into a full fledged agency. Our leads come from a
                    variety of industries. If you're just starting out you'll
                    easily find your next client.
                  </div>
                </div>
              </div>
              {/* five Accordion Item */}
              <div className="rounded-lg border bg-white shadow-lg border-neutral-200 dark:border-neutral-600 dark:bg-body-dark">
                <h2 className="mb-0" id="flush-headingFour">
                  <button
                    className="group relative flex w-full items-center rounded-lg border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition overflow-anchor:none hover:z-[2] focus:z-[3] focus:outline-none dark:bg-body-dark dark:text-white"
                    type="button"
                    onClick={() => {
                      toggleAccordion(4);
                      rotateIcon("iconSpanFive");
                    }}
                    aria-expanded={activeAccordion === 4 ? "true" : "false"}
                    aria-controls="flush-collapseFive"
                  >
                    <div className="flex items-center">
                      <div>
                        <MdGppGood className="bg-[--second-color] text-[--three-color] text-7xl p-5 rounded-lg md:mx-0 lg:mx-0 mx-auto" />
                      </div>
                      <div className="text-xl font-semibold ps-5">
                        What do I need to do?
                      </div>
                    </div>
                    <span
                      className="-me-1 ms-auto h-5 w-5 shrink-0 rotate-0 transition-transform duration-200 ease-in-out group-data-[twe-collapse-collapsed]:me-0 group-data-[twe-collapse-collapsed]:rotate-180 motion-reduce:transition-none"
                      id="iconSpanFive"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        id="arrowIconFive"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </span>
                  </button>
                </h2>
                <div
                  id="flush-collapseFour"
                  className={`px-5 pt-0 py-4 ${
                    activeAccordion === 4 ? "!visible" : "hidden"
                  } border-0`}
                  aria-labelledby="flush-headingFour"
                >
                  <div className="text-sm">
                    Jump into the Lead Hunter dashboard and start finding the
                    perfect leads for your business. After that start reaching
                    out to the business. We provide verified email addresses,
                    phone numbers, social contacts and more.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FAQ;
