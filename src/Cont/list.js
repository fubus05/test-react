import React, { useState } from 'react'

const ContinentsContext = React.createContext();
export const ContinentsProvider = ContinentsContext.Provider;
export const ContinentsConsumer = ContinentsContext.Consumer;

const ItemsList = ({ data }) => {

    return (
        <ul>
            {
                data.map(item => {
                    return <Item key={item.name} item={item}/>
                })
            }
        </ul>
    )
};

const Item = ({item}) =>{

    const [show, setShow] = useState(false);

    const showChildren = () => {
        setShow(!show)
    };

    const name = item.name ? item.name : item.code;
    const array = Object.values(item).find(item => Array.isArray(item));

    return (
        <li>
            {array && array.length > 0 ?
                <>
                    <button onClick={showChildren}>{name}</button>
                    {show && <ItemsList data={array} />}
                </>
                :
                <ContinentsConsumer>
                    {
                        ({ closeNode }) => {
                            return (
                                <button type='button' onClick={closeNode}>{name}</button>
                            )
                        }
                    }

                </ContinentsConsumer>
            }
        </li>
    )
};

const MainLandListe = ({data}) => {

    const [show, setShow] = useState(false);

    const showChildren = () => {
        setShow(!show)
    };

    const array = Object.values(data).find(item => Array.isArray(item));

    return (
        <ContinentsProvider value={{closeNode: showChildren}}>
            <li>
                <button onClick={showChildren}>{data.name}</button>
                {
                    show &&  array && <ItemsList data={array} />
                }
            </li>
        </ContinentsProvider>
    )
};

export default MainLandListe;