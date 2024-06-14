import { TBookSchedule } from "./bookingModel.interface";

export const hasBookingTimeConflict = (
    schedules: TBookSchedule[],
    newSchedule: TBookSchedule,
  ) => {
    for (const schedule of schedules) {
        if (schedule.date !== newSchedule.date) {
            continue; 
          }
      const existStartTime = new Date(`2000-01-01T${schedule.startTime}`);
      const existEndTime = new Date(`2000-01-01T${schedule.endTime}`);
      const newStartTime = new Date(`2000-01-01T${newSchedule.startTime}`);
      const newEndTime = new Date(`2000-01-01T${newSchedule.endTime}`);
  
      // 10:00 - 12:00
      //10:30-12:30
      //9-11
      //10-12

      //notconflict
      //8-10
      //13-14

      if ((newStartTime < existEndTime && newEndTime > existStartTime)||(newStartTime == existStartTime && newEndTime ==existEndTime)) {
        return true;
      }
    }
  
    return false;
  };