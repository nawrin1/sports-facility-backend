import { TimeSlot } from "./bookingModel.interface";


  
  export const findAvailableSlots = (bookingValue: TimeSlot[]): TimeSlot[] => {
    const availableSlots: TimeSlot[] = [];
    const dayStartTime = '00:00';
    const dayEndTime = '24:00';
    let currentTime = dayStartTime;

    while (currentTime < dayEndTime) {
      let slotAvailable = true;

      for (const bookedSlot of bookingValue) {
        const bookedStartTime = bookedSlot.startTime;//10:00-
        const bookedEndTime = bookedSlot.endTime;//13:00
 
        if (
          (currentTime > bookedStartTime && currentTime < bookedEndTime) || 
          (addHours(currentTime, 2) > bookedStartTime && addHours(currentTime, 2) <= bookedEndTime) ||(currentTime==bookedStartTime)
        ) {
          slotAvailable = false;
          
        }
      }
  
      if (slotAvailable) {
        availableSlots.push({
          startTime: currentTime,
          endTime: addHours(currentTime, 2),
        });
      }

      currentTime = addHours(currentTime, 2);
    }
    // console.log(availableSlots,"avi")
    return availableSlots;
  };

  const addHours = (time: string, hours: number): string => {
    const hour=Number(time.split(":")[0])
    const minute=Number(time.split(":")[1])
    const newHour = hour + hours;
    const newMinute = minute;
  
    
  
    return `${(newHour).toString().padStart(2, '0')}:${(newMinute).toString().padStart(2, '0')}`;
  };
  

 
  
  