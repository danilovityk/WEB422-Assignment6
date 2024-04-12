import { searchHistoryAtom } from '@/store'
import { useAtom } from 'jotai'
import { useRouter } from 'next/router'
import { Card, Button } from 'react-bootstrap'
import ListGroup from 'react-bootstrap/ListGroup';
import styles from '@/styles/History.module.css';
import { removeFromHistory } from '@/lib/userData';


export default function SearchHistory() {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const router = useRouter();
  if(!searchHistory) return null;
  let parsedHistory = [];

   
  searchHistory.forEach((h) => {
    let params = new URLSearchParams(h);
    let entries = params.entries();
    parsedHistory.push(Object.fromEntries(entries));
  });
    
  function historyClicked(e, index)
  {
    router.push('/artwork?' + searchHistory[index])
  }
    
  async function removeHistoryClicked(e, index)
  {
    e.stopPropagation(); // stop the event from trigging other events
    setSearchHistory(await removeFromHistory(searchHistory[index])) 
  }
    
    if (parsedHistory.length > 0)
    {
        return (
          <>
                <ListGroup>{parsedHistory.map((historyItem, index) =>
                {
                    return (
                        <ListGroup.Item className={styles.historyListItem} onClick={(e) => historyClicked(e, index)}>
                            {Object.keys(historyItem).map(key => (<>{key}: <strong>{historyItem[key]}</strong>&nbsp;</>))}
                            <Button className="float-end" variant="danger" size="sm" onClick={e => removeHistoryClicked(e, index)}>&times;</Button>
                    </ListGroup.Item>
                    )
                })}
                </ListGroup>
          </>
        );
    } else
    {
        return (
          <>
            <Card>
              <p>
                <br />
                <h4>Nothing Here</h4>
                Try adding new artwork to the list.
              </p>
            </Card>
          </>
        );
        
    }
  
}