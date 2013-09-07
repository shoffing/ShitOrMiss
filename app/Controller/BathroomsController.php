<?php
class BathroomsController extends AppController {

       /* public function beforeFilter()
        {
                parent::beforeFilter();
                $this->Auth->allow('upload'); //Allows anyone to upload files
        } */

        public function upload()
        {
                if ($this->request->is('post'))
                {
			var_dump($this->request->data);
                }
		$this->redirect(array('controller' => 'pages', 'action' => 'display', 'home'));
        }
}
