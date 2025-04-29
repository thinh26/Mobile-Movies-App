/**
 * Constants related to time conversion
 */
const TIME_CONSTANTS = {
  MINUTES_PER_HOUR: 60,
  DEFAULT_HOURS: 0,
  DEFAULT_MINUTES: 0,
  MINIMUM_VALID_MINUTES: 0,
} as const;

/**
 * Type definition for conversion result
 */
interface TimeConversionResult {
  hours: number;
  minutes: number;
}

/**
 * Format options for time unit display
 */
export enum TimeFormatOption {
  /** Full words (hour, hours, minute, minutes) */
  FULL = "full",
  /** Short form (h, m) */
  SHORT = "short",
  /** Abbreviated form (hr, hrs, min, mins) */
  ABBREVIATED = "abbreviated",
}

/**
 * Converts a total number of minutes into hours and remaining minutes
 * Handles falsy values by returning default values (0 hours, 0 minutes)
 *
 * @param totalMinutes - The total minutes to convert
 * @returns An object containing hours and remaining minutes
 */
export const convertMinutesToHoursAndMinutes = (
  totalMinutes: number | null | undefined | string
): TimeConversionResult => {
  // Handle falsy values by returning defaults
  if (!totalMinutes && totalMinutes !== 0) {
    return {
      hours: TIME_CONSTANTS.DEFAULT_HOURS,
      minutes: TIME_CONSTANTS.DEFAULT_MINUTES,
    };
  }

  // Convert to number if it's a string or other type
  const parsedMinutes = Number(totalMinutes);

  // If conversion failed, return default values
  if (Number.isNaN(parsedMinutes)) {
    return {
      hours: TIME_CONSTANTS.DEFAULT_HOURS,
      minutes: TIME_CONSTANTS.DEFAULT_MINUTES,
    };
  }

  // Handle negative values by treating them as positive
  const absoluteMinutes = Math.abs(parsedMinutes);

  // Calculate hours and remaining minutes
  const hours = Math.floor(absoluteMinutes / TIME_CONSTANTS.MINUTES_PER_HOUR);
  const minutes = absoluteMinutes % TIME_CONSTANTS.MINUTES_PER_HOUR;

  return { hours, minutes };
};

/**
 * Gets the appropriate unit labels based on format option and quantity
 * @param quantity - The quantity of the time unit
 * @param unitName - The base unit name ('hour' or 'minute')
 * @param format - The format option
 * @returns Appropriate time unit label
 */
const getUnitLabel = (
  quantity: number,
  unitName: "hour" | "minute",
  format: TimeFormatOption = TimeFormatOption.FULL
): string => {
  // Mapping of unit types to their various formats
  const unitFormats = {
    hour: {
      [TimeFormatOption.FULL]: quantity === 1 ? "hour" : "hours",
      [TimeFormatOption.SHORT]: "h",
      [TimeFormatOption.ABBREVIATED]: quantity === 1 ? "hr" : "hrs",
    },
    minute: {
      [TimeFormatOption.FULL]: quantity === 1 ? "minute" : "minutes",
      [TimeFormatOption.SHORT]: "m",
      [TimeFormatOption.ABBREVIATED]: quantity === 1 ? "min" : "mins",
    },
  };

  return unitFormats[unitName][format];
};

/**
 * Formats the time conversion result into a readable string
 * @param result - The time conversion result object
 * @param format - The format option for time units
 * @returns A formatted string representation
 */
export const formatTimeConversion = (
  result: TimeConversionResult,
  format: TimeFormatOption = TimeFormatOption.FULL
): string => {
  const hourLabel = getUnitLabel(result.hours, "hour", format);
  const minuteLabel = getUnitLabel(result.minutes, "minute", format);

  // Join with the appropriate conjunction based on format
  const conjunction1 = format === TimeFormatOption.SHORT ? " " : " and ";
  const conjunction2 = format === TimeFormatOption.SHORT ? "" : " ";
  return `${result.hours}${conjunction2}${hourLabel}${conjunction1}${result.minutes}${conjunction2}${minuteLabel}`;
};
