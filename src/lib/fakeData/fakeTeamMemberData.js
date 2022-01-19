import AnneAdler from 'assets/avatarImages/AnneAdler.png';
import AntonySantos from 'assets/avatarImages/AntonySantos.png';
import BarbaraKerr from 'assets/avatarImages/BarbaraKerr.png';
import CarlaRossi from 'assets/avatarImages/CarlaRossi.png';
import ClareMendoza from 'assets/avatarImages/ClareMendoza.png';
import JohnSimon from 'assets/avatarImages/JohnSimon.png';
import LongDang from 'assets/avatarImages/LongDang.png';
import MichaelKumbala from 'assets/avatarImages/MichaelKumbala.png';
import PaulDoyle from 'assets/avatarImages/PaulDoyle.png';
import RobertMontgomery from 'assets/avatarImages/RobertMontgomery.png';

var fakeTeamMemberDataList = [
  {
    id: '61768a2810e29d8ab44eafb6',
    avatarPicture: PaulDoyle,
  },
  {
    id: '6176a78310e29d8ab44eb00e',
    avatarPicture: JohnSimon,
  },
  {
    id: '6176a86410e29d8ab44eb018',
    avatarPicture: BarbaraKerr,
  },
  {
    id: '6176a9de10e29d8ab44eb01e',
    avatarPicture: CarlaRossi,
  },
  {
    id: '6176aadd10e29d8ab44eb02a',
    avatarPicture: ClareMendoza,
  },
  {
    id: '6177c04b10e29d8ab44eb0d9',
    avatarPicture: AnneAdler,
  },
];

function getCorrespondingFakeTeamMember(id) {
  for (var index in fakeTeamMemberDataList) {
    if (fakeTeamMemberDataList[index].id == id) {
      return fakeTeamMemberDataList[index];
    }
  }
  return null;
}

function completeTeamMember(teamMember) {
  var fakeTeamMemberData = getCorrespondingFakeTeamMember(teamMember.id_);

  if (fakeTeamMemberData) {
    teamMember.avatarPicture = fakeTeamMemberData.avatarPicture;
  }

  return teamMember;
}

export const completeTeamMemberInfo = (teamMember) => {
  return completeTeamMember(teamMember);
};

export const completeTeamMembersInfo = (teamMembersList) => {
  for (var index in teamMembersList) {
    teamMembersList[index] = completeTeamMember(teamMembersList[index]);
  }

  return teamMembersList;
};
