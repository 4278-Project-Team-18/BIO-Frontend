/* eslint-disable autofix/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useContext, useState } from "react";
import type { PropsWithChildren } from "react";
import type { Class, Student } from "../interfaces/User.interface";

// User context types
interface ClassesContextType {
  currentClasses: Class[] | null;
  setCurrentClasses: (classes: Class[]) => void;
  addStudentToClass: (student: Student, classId: string) => void;
  removeStudentFromClass: (studentId: string, classId: string) => void;
}

// Create the context for the user
const ClassesContext = createContext<ClassesContextType>({
  currentClasses: null,
  setCurrentClasses: (_: Class[]) => {},
  addStudentToClass: (_: Student, __: string) => {},
  removeStudentFromClass: (_: string, __: string) => {},
});

// Create the wrapper for the user context
export const ClassesProvider = ({ children }: PropsWithChildren) => {
  const [currentClasses, setCurrentClasses] = useState<Class[]>([] as Class[]);

  const addStudentToClass = (student: Student, classId: string) => {
    const newClasses = currentClasses?.map((classItem: Class) => {
      if (classItem._id === classId) {
        return {
          ...classItem,
          students: [...(classItem.students || []), student],
        };
      } else {
        return classItem;
      }
    });

    setCurrentClasses(newClasses);
  };

  const removeStudentFromClass = (studentId: string, classId: string) => {
    const newClasses = currentClasses?.map((classItem: Class) => {
      if (classItem._id === classId) {
        return {
          ...classItem,
          students: classItem.students?.filter(
            (student: Student) => student._id !== studentId,
          ),
        };
      } else {
        return classItem;
      }
    });

    setCurrentClasses(newClasses);
  };

  const value = {
    currentClasses,
    setCurrentClasses,
    addStudentToClass,
    removeStudentFromClass,
  };

  return (
    <ClassesContext.Provider value={value}>{children}</ClassesContext.Provider>
  );
};

/**
 * A hook to use the classes context
 * @returns {ClassesContextType} The classes context
 * @example
 * ```tsx
 * const { currentClasses, setCurrentClasses, addStudentToClass, removeStudentFromClass } = useClassesContext();
 * ```
 */
export const useClassesContext = () => {
  const context = useContext(ClassesContext);

  if (context === undefined) {
    throw new Error("useClassesProvider must be used within a ClassesProvider");
  }

  return context;
};
