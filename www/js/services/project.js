.factory('ProjectModels', function($q){
  var projects = [
    {
      title: 'Survey Only Project',
      id: '1',
      image: 'http://placehold.it/300x100&text=project+logo',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ac venenatis enim. Nunc laoreet pulvinar purus, at aliquam erat convallis eu. Pellentesque tincidunt felis eros, at porttitor turpis viverra ac.',
      steps: [
        {
          type: 'survey',
          questions: [
            {
              type: 'multiple-choice',
              text: 'How many licks does it take to get to the center of a Tootsie Roll Tottsie Pop?',
              options: [
                {
                  text: '1',
                  value: '1'
                },
                {
                  text: '2',
                  value: '2'
                },
                {
                  text: '3',
                  value: '3'
                }
              ]
            },
            {
              text: 'How much wood would a woodchuck chuck if a woodchuck could chuck wood?',
              type: 'check-all',
              options: [
                {
                  text: '1 bundle',
                  value: '1'
                },
                {
                  text: '2 bundles',
                  value: '2'
                },
                {
                  text: 'As much wood as a woodchuck could chuck if a woodchuck could chuck wood!',
                  value: '3'
                }
              ]
            },
            {
              text: 'How old are you?',
              type: 'select',
              options: [
                {
                  text: '18 - 29',
                  value: '1'
                },
                {
                  text: '29 - 40',
                  value: '2'
                },
                {
                  text: '40+',
                  value: '3'
                }
              ]
            },
            {
              text: 'Anything you\'d like to say?',
              type: 'open'
            }
          ]
        }
      ]
    },
    {
      title: 'Video Only Project',
      id: '2',
      image: 'http://placehold.it/300x100&text=project+logo',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ac venenatis enim. Nunc laoreet pulvinar purus, at aliquam erat convallis eu. Pellentesque tincidunt felis eros, at porttitor turpis viverra ac.',
      steps: [
        {
          type: 'video',
          title: 'Red Cross Stories',
          id: '289sNNEhDwg'
        }
      ]
    },
    {
      title: 'Video then Survey Project',
      id: '3',
      image: 'http://placehold.it/300x100&text=project+logo',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ac venenatis enim. Nunc laoreet pulvinar purus, at aliquam erat convallis eu. Pellentesque tincidunt felis eros, at porttitor turpis viverra ac.',
      steps: [
        {
          type: 'video',
          title: 'Red Cross Stories',
          id: '289sNNEhDwg'
        },
        {
          type: 'survey',
          questions: [
            {
              type: 'multiple-choice',
              text: 'How many licks does it take to get to the center of a Tootsie Roll Tottsie Pop?',
              options: [
                {
                  text: '1',
                  value: '1'
                },
                {
                  text: '2',
                  value: '2'
                },
                {
                  text: '3',
                  value: '3'
                }
              ]
            },
            {
              text: 'How much wood would a woodchuck chuck if a woodchuck could chuck wood?',
              type: 'check-all',
              options: [
                {
                  text: '1 bundle',
                  value: '1'
                },
                {
                  text: '2 bundles',
                  value: '2'
                },
                {
                  text: 'As much wood as a woodchuck could chuck if a woodchuck could chuck wood!',
                  value: '3'
                }
              ]
            },
            {
              text: 'How old are you?',
              type: 'select',
              options: [
                {
                  text: '18 - 29',
                  value: '1'
                },
                {
                  text: '29 - 40',
                  value: '2'
                },
                {
                  text: '40+',
                  value: '3'
                }
              ]
            },
            {
              text: 'Anything you\'d like to say?',
              type: 'open'
            }
          ]
        }
      ]
    },
    {
      title: 'Two Video Project',
      id: '4',
      image: 'http://placehold.it/300x100&text=project+logo',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ac venenatis enim. Nunc laoreet pulvinar purus, at aliquam erat convallis eu. Pellentesque tincidunt felis eros, at porttitor turpis viverra ac.',
      steps: [
        {
          type: 'video',
          title: 'Red Cross Stories',
          id: '289sNNEhDwg'
        },
        {
          type: 'video',
          title: 'Red Cross Stories',
          id: '0GajJYKGYUo'
        }
      ]
    },
    {
      title: 'Survey then Video Project',
      id: '4',
      image: 'http://placehold.it/300x100&text=project+logo',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ac venenatis enim. Nunc laoreet pulvinar purus, at aliquam erat convallis eu. Pellentesque tincidunt felis eros, at porttitor turpis viverra ac.',
      steps: [
        {
          type: 'survey',
          questions: [
            {
              type: 'multiple-choice',
              text: 'How many licks does it take to get to the center of a Tootsie Roll Tottsie Pop?',
              options: [
                {
                  text: '1',
                  value: '1'
                },
                {
                  text: '2',
                  value: '2'
                },
                {
                  text: '3',
                  value: '3'
                }
              ]
            },
            {
              text: 'How much wood would a woodchuck chuck if a woodchuck could chuck wood?',
              type: 'check-all',
              options: [
                {
                  text: '1 bundle',
                  value: '1'
                },
                {
                  text: '2 bundles',
                  value: '2'
                },
                {
                  text: 'As much wood as a woodchuck could chuck if a woodchuck could chuck wood!',
                  value: '3'
                }
              ]
            },
            {
              text: 'How old are you?',
              type: 'select',
              options: [
                {
                  text: '18 - 29',
                  value: '1'
                },
                {
                  text: '29 - 40',
                  value: '2'
                },
                {
                  text: '40+',
                  value: '3'
                }
              ]
            },
            {
              text: 'Anything you\'d like to say?',
              type: 'open'
            }
          ]
        },
        {
          type: 'video',
          title: 'Red Cross Stories',
          id: '289sNNEhDwg'
        }
      ]
    }
  ],
      current = null,
      step,
      surveyStep,
      answers;

  return {
    getProjects: function()
    {
      var deferred = $q.defer();
      setTimeout(function()
      {
        //hack to show loader
        deferred.resolve(projects);
      }, 500)
      return deferred.promise;
    },
    getProjectById: function(id)
    {
      var deferred = $q.defer();
      current = _.find(projects, {id: id});
      step = 0;
      surveyStep = 0;
      answers = {};
      deferred.resolve(current);
      return deferred.promise;
    },
    getCurrent: function(id)
    {
      var deferred = $q.defer();
      if(current)
      {
        deferred.resolve({
            project: current,
            step: step,
            surveyStep: surveyStep
          }
        );
      }else
      {
        this.getProjectById(id).then(function()
        {
          deferred.resolve({
              project: current,
              step: step,
              surveyStep: surveyStep
            }
          );
        });
      }
      return deferred.promise;
    },
    incrementProjectStep: function()
    {
      step++;
      return current.steps.length > step;
    },
    incrementSurvey: function()
    {
      surveyStep++;
    }
  };
})