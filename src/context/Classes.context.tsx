/* eslint-disable autofix/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useContext, useState } from "react";
import type { PropsWithChildren } from "react";
import type { Class, Student } from "../interfaces/User.interface";

// User context types
interface ClassesContextType {
  currentClasses: Class[] | null;
  setCurrentClasses: (classes: Class[]) => void;
  addClass: (classItem: Class) => void;
  addStudentToClass: (student: Student, classId: string) => void;
  editStudentInClass: (student: Student, classId: string) => void;
  removeStudentFromClass: (studentId: string, classId: string) => void;
  updateStudentLetterLink: (
    studentId: string,
    studentLetterLink: string,
  ) => void;
  removeClass: (classId: string) => void;
}

// Create the context for the user
const ClassesContext = createContext<ClassesContextType>({
  currentClasses: null,
  setCurrentClasses: (_: Class[]) => {},
  addClass: (_: Class) => {},
  addStudentToClass: (_: Student, __: string) => {},
  editStudentInClass: (_: Student, __: string) => {},
  removeStudentFromClass: (_: string, __: string) => {},
  updateStudentLetterLink: (_: string, __: string) => {},
  removeClass: (_: string) => {},
});

// Create the wrapper for the user context
export const ClassesProvider = ({ children }: PropsWithChildren) => {
  const [currentClasses, setCurrentClasses] = useState<Class[]>([] as Class[]);

  const addClass = (classItem: Class) => {
    setCurrentClasses([...currentClasses, classItem]);
  };

  const removeClass = (classId: string) => {
    setCurrentClasses(
      currentClasses.filter((classItem: Class) => classItem._id !== classId),
    );
  };

  // function to add a student to a class
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

  // function to remove a student from a class
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

  const editStudentInClass = (student: Student, classId: string) => {
    const newClasses = currentClasses?.map((classItem: Class) => {
      if (classItem._id === classId) {
        return {
          ...classItem,
          students: classItem.students?.map((studentItem: Student) => {
            if (studentItem._id === student._id) {
              return student;
            } else {
              return studentItem;
            }
          }),
        };
      } else {
        return classItem;
      }
    });
    setCurrentClasses(newClasses);
  };

  const updateStudentLetterLink = (
    studentId: string,
    studentLetterLink: string,
  ) => {
    const newClasses = currentClasses?.map((classItem: Class) => ({
      ...classItem,
      students: classItem.students?.map((studentItem: Student) => {
        if (studentItem._id === studentId) {
          return {
            ...studentItem,
            studentLetterLink,
          };
        } else {
          return studentItem;
        }
      }),
    }));
    setCurrentClasses(newClasses);
  };

  const value = {
    currentClasses,
    setCurrentClasses,
    addClass,
    addStudentToClass,
    editStudentInClass,
    removeStudentFromClass,
    updateStudentLetterLink,
    removeClass,
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
