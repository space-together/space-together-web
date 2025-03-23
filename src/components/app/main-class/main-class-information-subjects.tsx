"use client"
import SubjectCardSmall from '@/components/cards/subject-card-small'
import { getAllSubjectsByMainClassAPI } from '@/services/data/api-fetch-data';
import { subjectSchemaType } from '@/utils/schema/subject-schema';
import { useEffect, useState } from 'react';
interface props {
  mainClassId : string
}
const MainClassInformationSubjects = ({mainClassId} : props) => {
 const [SubjectsData, setSubjectsData] = useState<subjectSchemaType[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await getAllSubjectsByMainClassAPI();
        console.log("Fetched Data:", response);
        if (response.data && Array.isArray(response.data)) {
          setSubjectsData(response.data);
        } else {
          setError("Unexpected API response format");
        }
      } catch (err) {
        console.error("API Fetch Error:", err);
        setError("Failed to fetch Subjects data");
      }
    };

    fetchSubjects();
    const interval = setInterval(fetchSubjects, 5000); // Fetch updates every 5 seconds

    return () => clearInterval(interval);
  }, []);
  return (
    <div>
      {[...Array(5)].map((_, i) => (
        <SubjectCardSmall key={i}/>
      ))}
    </div>
  )
}

export default MainClassInformationSubjects
