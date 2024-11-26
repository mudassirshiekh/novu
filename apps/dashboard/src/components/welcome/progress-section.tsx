import React from 'react';
import { Card, CardContent } from '../primitives/card';
import { RiArrowRightDoubleFill, RiCheckLine, RiLoader3Line } from 'react-icons/ri';
import { useEnvironment } from '../../context/environment/hooks';
import { useOnboardingSteps, StepIdEnum } from '../../hooks/use-onboarding-steps';
import { Link } from 'react-router-dom';
import { buildRoute, LEGACY_ROUTES } from '../../utils/routes';
import { ROUTES } from '../../utils/routes';
import { motion } from 'framer-motion';

export function ProgressSection() {
  const { currentEnvironment } = useEnvironment();
  const { steps } = useOnboardingSteps();

  const mainCard = {
    hidden: { opacity: 0, scale: 0.98 },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
        when: 'beforeChildren',
      },
    },
  };

  const leftSection = {
    hidden: { opacity: 0, x: -10 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        staggerChildren: 0.1,
      },
    },
  };

  const textItem = {
    hidden: { opacity: 0, y: 8 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  const stepsList = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
        ease: 'easeOut',
      },
    },
  };

  const stepItem = {
    hidden: {
      opacity: 0,
      y: 10,
      scale: 0.98,
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.21, 1.02, 0.73, 0.99], // subtle bounce
      },
    },
  };

  const logo = {
    hidden: { opacity: 0 },
    show: {
      opacity: 0.5,
      transition: {
        delay: 0.4,
        duration: 0.6,
      },
    },
  };

  return (
    <motion.div variants={mainCard} initial="hidden" animate="show">
      <Card className="relative flex items-stretch gap-2 rounded-xl border-neutral-100 shadow-none">
        <motion.div
          variants={leftSection}
          className="flex w-full max-w-[380px] grow flex-col items-start justify-between gap-2 rounded-l-xl bg-[#FBFBFB] p-6"
        >
          <div className="flex w-full flex-col gap-2">
            <motion.h2 variants={textItem} className="font-label-medium text-base font-medium">
              You're doing great work! 💪
            </motion.h2>

            <div className="flex flex-col gap-6 text-sm text-neutral-400">
              <motion.p variants={textItem}>Set up Novu to send notifications your users will love.</motion.p>

              <motion.p variants={textItem}>
                Streamline all your customer messaging in one tool and delight them at every touchpoint.
              </motion.p>
            </div>
          </div>

          <motion.div variants={textItem} className="space-between flex items-center gap-0">
            <p className="text-sm text-neutral-400">Get started with our setup guide.</p>
            <PointingArrow className="relative left-[15px] top-[-10px]" />
          </motion.div>
        </motion.div>

        <motion.div className="flex flex-1 flex-col gap-3 p-6" variants={stepsList}>
          {steps.map((step, index) => (
            <motion.div key={index} className="flex max-w-[370px] items-center gap-1.5" variants={stepItem}>
              <div
                className={`${step.status === 'completed' ? 'bg-success' : 'shadow-xs'} flex h-6 w-6 min-w-6 items-center justify-center rounded-full`}
              >
                {step.status === 'completed' ? (
                  <RiCheckLine className="h-4 w-4 text-[#ffffff]" />
                ) : (
                  <RiLoader3Line className="h-4 w-4 text-neutral-400" />
                )}
              </div>

              <Link
                to={getStepRoute(step.id, currentEnvironment?.slug).path}
                reloadDocument={getStepRoute(step.id).isLegacy}
                className="w-full"
              >
                <Card
                  className={`shadow-xs w-full p-1 ${step.status !== 'completed' ? 'transition-all duration-200 hover:translate-x-[1px] hover:shadow-md' : ''}`}
                >
                  <CardContent className="flex flex-col rounded-[6px] bg-[#FBFBFB] px-2 py-1.5">
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs ${step.status === 'completed' ? 'text-neutral-400 line-through' : 'text-neutral-600'}`}
                      >
                        {step.title}
                      </span>
                      <RiArrowRightDoubleFill className="h-4 w-4 text-neutral-400" />
                    </div>
                    <p className="text-[10px] leading-[14px] text-neutral-400">{step.description}</p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={logo} className="absolute bottom-0 right-0">
          <NovuLogo />
        </motion.div>
      </Card>
    </motion.div>
  );
}

function PointingArrow(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="107" height="35" viewBox="0 0 107 35" fill="none" {...props}>
      <path
        d="M1 27.2661C16.7695 28.2353 30.311 24.9451 39.3177 11.1566C42.3496 6.51503 43.5764 -1.23127 35.0602 1.6103C27.1492 4.24991 22.9187 15.9962 25.9917 23.5157C30.6031 34.8 44.0773 35.3579 54.4745 32.6359C70.56 28.4247 86.2996 22.8313 100.626 14.3956C103.544 12.6773 82.509 8.99914 89.5139 11.1566C94.4582 12.6794 98.9618 12.6909 104.075 12.6909C107.756 12.6909 105.402 13.9267 103.266 15.7593C99.7945 18.7376 96.3821 23.5469 95.2615 28.0332"
        stroke="#E1E4EA"
        stroke-width="2"
        stroke-linecap="round"
      />
    </svg>
  );
}
function NovuLogo() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="328" height="232" viewBox="0 0 328 232" fill="none">
      <g opacity="0.5">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M292.6 152.309C292.6 162.521 280.202 167.58 273.054 160.277L126.777 10.7707C147.089 3.62399 168.468 -0.018086 190 6.75293e-05C227.798 6.75293e-05 263.007 11.0438 292.6 30.0557V152.309ZM345.8 81.2251V152.309C345.8 210.199 275.512 238.866 235.03 197.481L77.7219 36.7057C30.59 71.2857 0 127.074 0 190C0 230.458 12.6469 267.959 34.2 298.775V228.071C34.2 170.181 104.488 141.514 144.97 182.899L302.064 343.449C349.315 308.893 380 253.033 380 190C380 149.542 367.353 112.041 345.8 81.2251ZM106.946 220.103L252.949 369.313C233.249 376.236 212.064 380 190 380C152.214 380 116.993 368.956 87.4 349.944V228.071C87.4 217.859 99.8094 212.8 106.946 220.103Z"
          fill="url(#paint0_linear_7382_226455)"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M292.6 152.309C292.6 162.521 280.202 167.58 273.054 160.277L126.777 10.7707C147.089 3.62399 168.468 -0.018086 190 6.75293e-05C227.798 6.75293e-05 263.007 11.0438 292.6 30.0557V152.309ZM345.8 81.2251V152.309C345.8 210.199 275.512 238.866 235.03 197.481L77.7219 36.7057C30.59 71.2857 0 127.074 0 190C0 230.458 12.6469 267.959 34.2 298.775V228.071C34.2 170.181 104.488 141.514 144.97 182.899L302.064 343.449C349.315 308.893 380 253.033 380 190C380 149.542 367.353 112.041 345.8 81.2251ZM106.946 220.103L252.949 369.313C233.249 376.236 212.064 380 190 380C152.214 380 116.993 368.956 87.4 349.944V228.071C87.4 217.859 99.8094 212.8 106.946 220.103Z"
          fill="#F0F0F0"
          fill-opacity="0.15"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_7382_226455"
          x1="4.92032"
          y1="68.506"
          x2="158.207"
          y2="160.1"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#EEEEEE" stop-opacity="0" />
          <stop offset="1" stop-color="#F9F9F9" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function getStepRoute(stepId: StepIdEnum, environmentSlug: string = '') {
  switch (stepId) {
    case StepIdEnum.CREATE_A_WORKFLOW:
      return {
        path: buildRoute(ROUTES.WORKFLOWS, { environmentSlug }),
        isLegacy: false,
      };
    case StepIdEnum.CONNECT_EMAIL_PROVIDER:
    case StepIdEnum.CONNECT_IN_APP_PROVIDER:
    case StepIdEnum.CONNECT_PUSH_PROVIDER:
    case StepIdEnum.CONNECT_CHAT_PROVIDER:
    case StepIdEnum.CONNECT_SMS_PROVIDER:
      return {
        path: LEGACY_ROUTES.INTEGRATIONS,
        isLegacy: true,
      };
    case StepIdEnum.INVITE_TEAM_MEMBER:
      return {
        path: LEGACY_ROUTES.INVITE_TEAM_MEMBERS,
        isLegacy: true,
      };
    default:
      return {
        path: '#',
        isLegacy: false,
      };
  }
}
