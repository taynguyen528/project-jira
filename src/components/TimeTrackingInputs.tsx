import React from "react";
import { InputNumber, Slider } from "antd";

interface TimeTrackingInputsProps {
    totalEstimatedHours: number;
    hoursSpent: number;
    remainingHours: number;
    onTotalEstimatedHoursChange: (value: number) => void;
    onHoursSpentChange: (value: number) => void;
}

export const TimeTrackingInputs: React.FC<TimeTrackingInputsProps> = ({
    totalEstimatedHours,
    hoursSpent,
    remainingHours,
    onTotalEstimatedHoursChange,
    onHoursSpentChange,
}) => {
    return (
        <>
            <div className="mt-3 flex gap-4">
                <div className="w-1/2">
                    <label className="text-[18px] font-bold">
                        Total Estimated Hours
                    </label>
                    <div className="mt-2">
                        <InputNumber
                            style={{ width: "100%" }}
                            min={0}
                            step={0.1}
                            value={totalEstimatedHours}
                            onChange={(value) =>
                                onTotalEstimatedHoursChange(value ?? 0)
                            }
                        />
                    </div>
                </div>
                <div className="w-1/2">
                    <label className="text-[18px] font-bold">Hours spent</label>
                    <div className="mt-2">
                        <InputNumber
                            style={{ width: "100%" }}
                            min={0}
                            step={0.1}
                            value={hoursSpent}
                            onChange={(value) => onHoursSpentChange(value ?? 0)}
                        />
                    </div>
                </div>
            </div>

            <div className="mt-3">
                <label className="text-[18px] font-bold">Remaining Hours</label>
                <div className="mt-2">
                    <Slider
                        min={0}
                        max={totalEstimatedHours}
                        value={remainingHours}
                        disabled
                        step={0.1}
                        tooltip={{ formatter: (value) => `${value} hours` }}
                        style={{ width: "100%" }}
                        styles={{
                            tracks: {
                                backgroundColor: "#1677ff",
                            },
                        }}
                    />
                </div>
            </div>
        </>
    );
};
