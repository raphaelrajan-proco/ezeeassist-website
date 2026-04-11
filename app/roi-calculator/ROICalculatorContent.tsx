"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Button from "@/components/ui/Button";
import GatedContentPopup, { useGatedPopupTrigger } from "@/components/GatedContentPopup";

function Slider({
  label, value, min, max, step = 1, format = (v: number) => String(v),
  onChange,
}: {
  label: string; value: number; min: number; max: number; step?: number;
  format?: (v: number) => string; onChange: (v: number) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-baseline">
        <label className="text-sm font-semibold text-[#0A0A0A] dark:text-[#F0F0F0]">{label}</label>
        <span className="text-sm font-bold text-[#00AEEF]">{format(value)}</span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[#00AEEF] h-2 rounded-full"
      />
      <div className="flex justify-between text-xs text-gray-400 dark:text-gray-500">
        <span>{format(min)}</span><span>{format(max)}</span>
      </div>
    </div>
  );
}

function fmt(n: number) {
  return n >= 1_000_000
    ? `$${(n / 1_000_000).toFixed(2)}M`
    : n >= 1_000
    ? `$${(n / 1_000).toFixed(0)}K`
    : `$${n.toFixed(0)}`;
}

export default function ROICalculatorContent() {
  const [locations, setLocations] = useState(50);
  const [questionsPerLocation, setQuestionsPerLocation] = useState(15);
  const [minutesPerQuestion, setMinutesPerQuestion] = useState(10);
  const [hourlyCost, setHourlyCost] = useState(35);
  const [repetitivePct, setRepetitivePct] = useState(60);

  const { show, setShow } = useGatedPopupTrigger();

  // Calculations
  const weeklyQuestions = locations * questionsPerLocation;
  const weeklyHours = (weeklyQuestions * minutesPerQuestion) / 60;
  const annualCost = weeklyHours * hourlyCost * 52;
  const deflected = weeklyQuestions * (repetitivePct / 100);
  const annualHoursSaved = (deflected * minutesPerQuestion) / 60 * 52;
  const annualSavings = annualHoursSaved * hourlyCost;

  const statCard = (label: string, value: string, highlight = false) => (
    <div className={`flex flex-col gap-1 rounded-xl p-4 ${highlight ? "bg-[#00AEEF]/[0.06] border border-[#00AEEF]/20" : "bg-white dark:bg-[#1A1A1A] border border-[#E5E7EB] dark:border-white/[0.08]"}`}>
      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">{label}</p>
      <p className={`text-2xl font-extrabold ${highlight ? "text-[#00AEEF]" : "text-[#0A0A0A] dark:text-[#F0F0F0]"}`} style={{ letterSpacing: "-0.02em" }}>{value}</p>
    </div>
  );

  return (
    <>
      <GatedContentPopup show={show} onClose={() => setShow(false)} />

      {/* Hero */}
      <section className="relative w-full border-b border-[#E5E7EB] dark:border-white/[0.06] bg-hero-gradient">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-4">ROI Calculator</p>
          <h1 className="text-4xl font-bold text-[#0A0A0A] dark:text-[#F0F0F0] sm:text-5xl" style={{ letterSpacing: "-0.02em" }}>
            Calculate your franchise support savings
          </h1>
          <p className="mt-5 mx-auto max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-400">
            See how much time and money EZee Assist can save your franchise network. Adjust the inputs below to match your organization.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="w-full bg-[#F7F8FA] dark:bg-[#111111]">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">

            {/* Inputs */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="rounded-2xl border border-[#E5E7EB] dark:border-white/[0.08] bg-white dark:bg-[#161616] p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.3)] flex flex-col gap-8"
            >
              <h2 className="text-lg font-bold text-[#0A0A0A] dark:text-[#F0F0F0]" style={{ letterSpacing: "-0.01em" }}>
                Your network
              </h2>

              <Slider label="Number of franchise locations" value={locations} min={10} max={1000} onChange={setLocations} />
              <Slider label="Support questions per location per week" value={questionsPerLocation} min={5} max={50} onChange={setQuestionsPerLocation} />
              <Slider label="Average time to answer one question (minutes)" value={minutesPerQuestion} min={5} max={30} onChange={setMinutesPerQuestion} />

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-[#0A0A0A] dark:text-[#F0F0F0]">Average hourly cost of support staff</label>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-gray-400 dark:text-gray-500">$</span>
                  <input
                    type="number" min={10} max={200} value={hourlyCost}
                    onChange={(e) => setHourlyCost(Number(e.target.value))}
                    className="w-full rounded-lg border border-[#E5E7EB] dark:border-white/[0.08] bg-white dark:bg-[#1A1A1A] px-4 py-2.5 text-sm text-[#0A0A0A] dark:text-[#F0F0F0] focus:border-[#00AEEF] focus:outline-none focus:ring-2 focus:ring-[#00AEEF]/20"
                  />
                  <span className="text-sm text-gray-400 dark:text-gray-500">/hr</span>
                </div>
              </div>

              <Slider
                label="Percentage of questions that are repetitive"
                value={repetitivePct} min={30} max={90}
                format={(v) => `${v}%`}
                onChange={setRepetitivePct}
              />
            </motion.div>

            {/* Results */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
              className="flex flex-col gap-6"
            >
              <div className="rounded-2xl border border-[#E5E7EB] dark:border-white/[0.08] bg-white dark:bg-[#161616] p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.3)]">
                <h2 className="text-lg font-bold text-[#0A0A0A] dark:text-[#F0F0F0] mb-6" style={{ letterSpacing: "-0.01em" }}>
                  Your results
                </h2>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  {statCard("Total weekly questions", weeklyQuestions.toLocaleString())}
                  {statCard("Weekly hours on support", weeklyHours.toFixed(1) + "h")}
                </div>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  {statCard("Annual support cost", fmt(annualCost))}
                  {statCard("Questions deflected/week", Math.round(deflected).toLocaleString())}
                </div>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  {statCard("Annual hours saved", Math.round(annualHoursSaved).toLocaleString() + "h")}
                  {statCard("Estimated payback", "< 3 months")}
                </div>

                {/* Big savings number */}
                <div className="mt-4 rounded-2xl border border-[#00AEEF]/30 bg-[#00AEEF]/[0.05] p-6 text-center">
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-2">Estimated annual savings</p>
                  <motion.p
                    key={annualSavings}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-5xl font-extrabold text-[#00AEEF]"
                    style={{ letterSpacing: "-0.03em" }}
                  >
                    {fmt(annualSavings)}
                  </motion.p>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">per year with EZee Assist</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* CTA */}
          <div className="mt-12 rounded-2xl border border-[#E5E7EB] dark:border-white/[0.08] bg-white dark:bg-[#161616] p-8 text-center shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.3)]">
            <h3 className="text-xl font-bold text-[#0A0A0A] dark:text-[#F0F0F0] mb-2" style={{ letterSpacing: "-0.01em" }}>
              Want to validate these numbers for your network?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Our team will build a custom ROI model based on your actual support data.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact"><Button size="lg">Book a Demo</Button></Link>
              <button onClick={() => setShow(true)}>
                <Button size="lg" variant="secondary">Or download the full ROI breakdown</Button>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
