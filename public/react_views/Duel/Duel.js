import React from 'react';

const Duel = ({nickname, duels}) => {
                console.log(duels);
                 return(
                    <div>
                        Your stats:

                        <div className="row">
                            <div className="col-12">
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                {Object.keys(duels).map(function(key, i){
                                                    console.log(key, i);
                                                    return(
                                                        <th scope="col" key={i}>
                                                            {key}
                                                        </th>
                                                    );
                                                })}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                {Object.keys(duels).map(function(key, i){
                                                    console.log(key, i);
                                                    return(
                                                        <td key={i}>
                                                            {duels[key]}
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>
                    </div>
                 );
             }

export default Duel;