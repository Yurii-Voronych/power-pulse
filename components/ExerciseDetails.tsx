"use client";
import { Exercise } from "@/lib/shared/types/types";
import Image from "next/image";
import CloseIcon from "./icons/CloseIcon";
import { useModalStore } from "./ui/modal/modal.store";

interface ExerciseDetailsProps {
  exercise: Exercise;
  calories: number;
}
const ExerciseDetails = ({ exercise, calories }: ExerciseDetailsProps) => {
  const close = useModalStore((s) => s.close);
  return (
    <div className="relative z-10 w-[calc(100%-40px)] max-w-83.75 rounded-xl border border-white/35 bg-[#10100f]">
      <button
        type="button"
        className="ml-auto block mt-2 mr-2 text-orange"
        onClick={close}
      >
        <CloseIcon />
      </button>
      <div className="p-4 flex items-center flex-col ">
        <Image
          src={exercise.gifUrl}
          width={270}
          height={226}
          alt=""
          unoptimized
          className="mb-6 h-56.5 w-67.5 object-contain"
        />
        <p className="text-white/40 mb-6">
          Estimated Calories per hour :{" "}
          <span className="text-orange"> {calories}</span>
        </p>
        <ul className="grid w-full grid-cols-2 gap-2 mb-6">
          <li className="min-w-0 bg-white/5 border border-white/20 p-1.5 rounded-xl">
            <p className="text-[12px] text-white/40">Name:</p>
            <p
              className="truncate text-[14px] text-white font-semibold"
              title={exercise.name}
            >
              {exercise.name}
            </p>
          </li>
          <li className="min-w-0 bg-white/5 border border-white/20 p-1.5 rounded-xl">
            <p className="text-[12px] text-white/40">Target:</p>
            <p
              className="truncate text-[14px] text-white font-semibold"
              title={exercise.target}
            >
              {exercise.target}
            </p>
          </li>
          <li className="min-w-0 bg-white/5 border border-white/20 p-1.5 rounded-xl">
            <p className="text-[12px] text-white/40">Body part:</p>
            <p
              className="truncate text-[14px] text-white font-semibold"
              title={exercise.bodyPart}
            >
              {exercise.bodyPart}
            </p>
          </li>
          <li className="min-w-0 bg-white/5 border border-white/20 p-1.5 rounded-xl">
            <p className="text-[12px] text-white/40">Equipment:</p>
            <p
              className="truncate text-[14px] text-white font-semibold"
              title={exercise.equipment}
            >
              {exercise.equipment}
            </p>
          </li>
        </ul>
        <button type="button" className="btn-primary">
          Add to Diary
        </button>
      </div>
    </div>
  );
};

export default ExerciseDetails;
