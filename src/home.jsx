import { useState } from 'react';
import HandleHomeDialog from './homedialog';
import HandleHomeDashboard from './homeDashboard';
function HandleHome() {
  const [userData, setUserData] = useState(() => {
    const saved = localStorage.getItem('userdata');
    return saved ? JSON.parse(saved) : null;
  });
  const [showDialog, setShowDialog] = useState(!userData);

  function CompleteDialog({ name, college, years }) {
    const data = { name, college, years };
    setUserData(data);
    localStorage.setItem('userdata', JSON.stringify(data));
    setShowDialog(false);
  }

  return (
    <>
      {showDialog && <HandleHomeDialog CompleteDialog={CompleteDialog} />}
      {!showDialog && (
        <HandleHomeDashboard
          name={userData.name}
          college={userData.college}
          years={userData.years}
        />
      )}
    </>
  );
}
export default HandleHome;
