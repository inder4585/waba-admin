import Header from './SingleNode/Header';
import Body from './SingleNode/Body';
import { FaRegCircleQuestion, FaRegCommentDots } from 'react-icons/fa6';
import Button from './SingleNode/Button';
import List from './SingleNode/List';
import Condition from './condition';
import Attribute from './attribute';
import Question from './Questions';
import Welcome from './Welcome';

const BotSays = ({ handleClone, handleRemove, data, handleEdit, id }) => {
  const icon = {
    wpBotSays: (
      <FaRegCommentDots
        style={{ position: 'relative' }}
        className="realtive"
        fontSize={18}
      />
    ),
    wpBotAsk: (
      <FaRegCircleQuestion
        style={{ position: 'relative' }}
        className="realtive"
        fontSize={18}
      />
    ),
  };
  return (
    <div
      id={`botsay${id}`}
      style={{ backgroundColor: 'rgb(230, 221, 212', width: '200px' }}
      onClick={(e) => {
        e?.stopPropagation();
      }}
    >
      {data?.name &&
        (data.name !== 'welcome' ? (
          <Header
            handleRemove={handleRemove}
            handleClone={() => handleClone(id)}
            handleEdit={() => handleEdit(id)}
            icon={icon[data?.name]}
            title={data?.properties.uniqueName}
          />
        ) : null)}
      <div>hi</div>
      {/* {data.name !== 'conditon' &&
        data.name !== 'setAttribute' &&
        data.name !== 'question' &&
        data.name !== 'welcome' && <Body data={data?.properties} />}

      {data.name === 'conditon' && <Condition />}
      {data.name === 'setAttribute' && <Attribute />}
      {data.name === 'question' && <Question />}
      {data.name === 'welcome' && <Welcome />}

      {data?.properties.button && (
        <div className="px-3 py-2">
          <Button arrButtonList={data?.properties.button}></Button>
        </div>
      )}
      {data?.properties.list && (
        <div className="px-3 py-2">
          <List data={data?.properties.list} />
        </div>
      )} */}
    </div>
  );
};

export default BotSays;
