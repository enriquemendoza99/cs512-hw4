CS 412/512 HW4 - Soccer Goalie (hierarchical model)
Open hw4.html in a browser (Chrome or Firefox).

CONTROLS
- Sliders: Body position, Shoulder angle, Elbow angle, Wrist angle
- Penalty button: shoots the ball to a random spot inside the goal.
  Move the goalie with the sliders to catch it with a glove (SAVED! or GOAL!)
- Mouse drag: rotates the scene
- Arrow keys, w, s: move the camera

1. HIERARCHICAL STRUCTURE (4 levels)
Body (root: torso + head + legs)
  -> Upper arm (shoulder joint)
     -> Forearm (elbow joint)
        -> Glove (wrist joint)
There are two arms (left and right), both children of the body.
The code uses a matrix stack with pushMatrix() / popMatrix(), like the
humanoid example in the Week 6-1 slides. See drawGoalie() and drawArm().

2. MODEL MOVEMENTS
All 4 levels move:
- Body: translation along the goal line
- Upper arm: rotation at the shoulder
- Forearm: rotation at the elbow
- Glove: rotation at the wrist
Moving a parent moves all of its children (chained movement).

UI elements: 4 sliders and 1 button.

3. BONUS / CREATIVITY
- Penalty game: the ball flies to a random spot in the goal and the user has
  to catch it with a glove, using all the levels of the hierarchy. The glove
  position is read from the matrix stack to check the save
- Phong lighting (ambient + diffuse + specular) in the fragment shader,
  following the Week 6-2 slides
- Normals for every primitive (Week 7-1): cross product for the cube faces,
  formulas for the sphere and cylinder, and the inverse transpose matrix
  to transform the normals
