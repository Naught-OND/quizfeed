import React        from "react";
import API          from "../utils/api";
import { Redirect } from 'react-router';
import { Button, Jumbotron, Row } from "reactstrap";
import Question from '../components/Question';
import PickingRow from '../components/PickingRow';
import "./EditQuiz.css";
import { SketchPicker } from 'react-color';
import Result from "../components/Result";



class Quiz extends React.Component{
    

    constructor(props){

        super(props);
        this.state = {

            quiz: {
                title: "",
                questions: [],
                results: [],
                isDraft: true,
                backgroundColor: "#b7f5a2",
                color: "black",
                _id: Date.now(),
                author: this.props.user.name,
                author_id: this.props.user._id,
                comments: [],
                stars: [],
                results: []
            },
            redirect: false,
            score: []

        },
        this.score = this.score.bind(this);

    }
    
    
    componentWillMount(){

        let id = this.props.match.params.id;

        API.findAll().then(arr=>console.log(arr));

        /* If id is part of the request it tried to find the quiz to edit */

        if(id) {

            console.log("finding quizzes with id " + id);

            API.getQuizById(id).then(res=>{


                if(res.data){

                    let score = [];
                    res.data.results.forEach(i => score.push(0))
                    this.setState({quiz: res.data, score: score, published: true});

                } else {

                    console.log("Error: no quiz");
                    this.setState({redirect: true});

                }

            });

        }

    }

    score(qInd,aInd,plusOne,plusTwo){

        console.log("trying to score " + qInd);
        console.log("at answer " + aInd)
        console.log(plusOne + " " + plusTwo)
        console.log("score " + this.state.score)

        let quiz = this.state.quiz;
        let score = this.state.score;

        let oldAnswer;
        quiz.questions[qInd].answered = true;
        quiz.questions[qInd].answers.forEach(i => {
            if(i.picked){
                console.log(i);
                if(i.plusOne)
                    score[i.plusOne] --;
                if(i.plusTwo)
                    score[i.plusTwo] -= 2;
            }
            i.picked = false
        });
        quiz.questions[qInd].answers[aInd].picked = true;
        if(plusOne > -1)
            score[plusOne] ++;
        if(plusTwo > -1)
            score[plusTwo] +=2



        this.setState({quiz: quiz, score: score});

    }

    render(){

        // Redirects on an error

        if(this.state.redirect)
            return <Redirect to="/404"/>
            
        return(
        
            <div className="container">

                <section className="jumbotron text-center" style={{backgroundColor: this.state.quiz.backgroundColor}}>

                    {/* Quiz Title */}

                 
                        <h1  style= { {color: this.state.quiz.color} }>
 { this.state.quiz.title }</h1>
                   

                </section>

                <center>

                        {this.state.quiz.questions.map((ele,i)=>

                            <Question key             = { "question-"+i            }
                                      question        = { ele                      } 
                                      save            = { this.saveBlock           }
                                      qInd            = { i                        }
                                      backgroundColor = { ele.backgroundColor      }
                                      color           = { ele.color                }
                                      type            = { ele.type                 } 
                                      results         = { this.state.quiz.results  } 
                                      score           = { this.score               }/>
                            
                        )}

                </center>

                                {
                    this.state.quiz.results.map((ele,i)=>

                        <Result key={"result-"+i}
                                   result={ele}
                                   save={this.saveBlock}
                                   rInd={i}
                                   handleChange={this.handleResultChange}
                                   setImage    = { this.handleResultImageChange }
                                   trash = {()=>this.deleteBlock("results",i)}/>

                    )
                }
             </div>

        )

    }

}

export default Quiz;