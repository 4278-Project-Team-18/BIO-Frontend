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
  updateVolunteerLetterLink: (
    studentId: string,
    volunteerLetterLink: string,
  ) => void;
  updateAssignedBookLink: (studentId: string, bookLink: string) => void;
  updateBookDeliveryDate: (studentId: string, bookDeliveryDate: string) => void;
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
  updateVolunteerLetterLink: (_: string, __: string) => {},
  updateAssignedBookLink: (_: string, __: string) => {},
  updateBookDeliveryDate: (_: string, __: string) => {},
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
    // replace the student's letter link with the new one
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

  const updateVolunteerLetterLink = (
    studentId: string,
    volunteerLetterLink: string,
  ) => {
    const newClasses = currentClasses?.map((classItem: Class) => ({
      ...classItem,
      students: classItem.students?.map((studentItem: Student) => {
        if (studentItem._id === studentId) {
          return {
            ...studentItem,
            volunteerLetterLink,
          };
        } else {
          return studentItem;
        }
      }),
    }));
    setCurrentClasses(newClasses);
  };

  const updateAssignedBookLink = (studentId: string, bookLink: string) => {
    const newClasses = currentClasses?.map((classItem: Class) => ({
      ...classItem,
      students: classItem.students?.map((studentItem: Student) => {
        if (studentItem._id === studentId) {
          return {
            ...studentItem,
            assignedBookLink: bookLink,
          };
        } else {
          return studentItem;
        }
      }),
    }));
    setCurrentClasses(newClasses);
  };

  const updateBookDeliveryDate = (
    studentId: string,
    bookDeliveryDate: string,
  ) => {
    const newClasses = currentClasses?.map((classItem: Class) => ({
      ...classItem,
      students: classItem.students?.map((studentItem: Student) => {
        if (studentItem._id === studentId) {
          return {
            ...studentItem,
            bookDeliveryDate,
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
    updateVolunteerLetterLink,
    updateAssignedBookLink,
    updateBookDeliveryDate,
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
